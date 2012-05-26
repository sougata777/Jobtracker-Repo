//
//   Copyright 2013 Sougata Sarkar
//
//   This file is part of Jobtracker.

//   Jobtracker is free software: you can redistribute it and/or modify it under the terms of the GNU General Public
//   License as published by the Free Software Foundation, either version 3 of the License, or (at your option) 
//   any later version.
//
//   JobTracker is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the
//   implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License 
//   for more details.
//
//   You should have received a copy of the GNU General Public License along with Jobtracker. If not, 
//   see http://www.gnu.org/licenses/.
//

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using JobTracker.Resources;
using JobTracker.DAL.Exceptions;


namespace JobTracker.DAL
{
    public class JobAttachmentDao
    {
        public int SaveAttachment(string name, string jobID, ref byte[] attachment, int contentLength, string contentType)
        {
            // connect to the database
            ConnectionStringSettingsCollection connections = ConfigurationManager.ConnectionStrings;
            string connectionString = connections["JobTrackerConnection"].ConnectionString;
            SqlConnection conn = new SqlConnection(connectionString);
            using (conn)
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = conn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "SaveJobAttachment";

                SqlParameter nameParam = new SqlParameter();
                nameParam.ParameterName = "@name";
                nameParam.Direction = ParameterDirection.Input;
                nameParam.SqlDbType = SqlDbType.VarChar;
                nameParam.Value = name;
                cmd.Parameters.Add(nameParam);

                SqlParameter jobIDParam = new SqlParameter();
                jobIDParam.ParameterName = "@jobID";
                jobIDParam.Direction = ParameterDirection.Input;
                jobIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                jobIDParam.Value = new Guid(jobID);
                cmd.Parameters.Add(jobIDParam);

                SqlParameter attachmentParam = new SqlParameter();
                attachmentParam.ParameterName = "@attachment";
                attachmentParam.Direction = ParameterDirection.Input;
                attachmentParam.SqlDbType = SqlDbType.VarBinary;
                attachmentParam.Value = attachment;
                cmd.Parameters.Add(attachmentParam);

                SqlParameter contentLengthParam = new SqlParameter();
                contentLengthParam.ParameterName = "@contentLength";
                contentLengthParam.Direction = ParameterDirection.Input;
                contentLengthParam.SqlDbType = SqlDbType.Int;
                contentLengthParam.Value = contentLength;
                cmd.Parameters.Add(contentLengthParam);

                SqlParameter contentTypeParam = new SqlParameter();
                contentTypeParam.ParameterName = "@contentType";
                contentTypeParam.Direction = ParameterDirection.Input;
                contentTypeParam.SqlDbType = SqlDbType.VarChar;
                contentTypeParam.Value = contentType;
                cmd.Parameters.Add(contentTypeParam);

                int rowsAffected = cmd.ExecuteNonQuery();

                if (rowsAffected == 0)
                {
                    throw new SaveAttachmentException(ErrorMessages.SaveAttachmentFailed);
                }

                return 0;
            }
        }

        public JobTracker.Entity.JobAttachment GetAttachment(string jobIDAsString)
        {
            JobTracker.Entity.JobAttachment ja = new JobTracker.Entity.JobAttachment();

            // connect to the database
            ConnectionStringSettingsCollection connections = ConfigurationManager.ConnectionStrings;
            string connectionString = connections["JobTrackerConnection"].ConnectionString;
            SqlConnection conn = new SqlConnection(connectionString);
            using (conn)
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = conn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetJobAttachment";

                SqlParameter jobIDParam = new SqlParameter();
                jobIDParam.ParameterName = "@jobID";
                jobIDParam.Direction = ParameterDirection.Input;
                jobIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                jobIDParam.Value = new Guid(jobIDAsString);
                cmd.Parameters.Add(jobIDParam);

                SqlDataReader reader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                int counter = 0;
                while (reader.Read())
                {
                    if (counter == 1) break;
                    counter++;

                    Guid jobID = reader.GetGuid(reader.GetOrdinal("JobID"));
                    int contentLength = reader.IsDBNull(reader.GetOrdinal("ContentLength")) ? 0 : reader.GetInt32(reader.GetOrdinal("ContentLength"));
                    string contentType = reader.IsDBNull(reader.GetOrdinal("ContentType")) ? string.Empty : reader.GetString(reader.GetOrdinal("ContentType"));
                    byte[] attachment = (byte[])reader["Attachment"];

                    ja.JobID = jobID;
                    ja.ContentLength = contentLength;
                    ja.ContentType = contentType;
                    ja.Attachment = attachment;
                }

                return ja;
            }
        }


        public int DeleteAttachment(string jobID)
        {
            // connect to the database
            ConnectionStringSettingsCollection connections = ConfigurationManager.ConnectionStrings;
            string connectionString = connections["JobTrackerConnection"].ConnectionString;
            SqlConnection conn = new SqlConnection(connectionString);
            using (conn)
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = conn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "DeleteJobAttachment";

                SqlParameter jobIDParam = new SqlParameter();
                jobIDParam.ParameterName = "@jobID";
                jobIDParam.Direction = ParameterDirection.Input;
                jobIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                jobIDParam.Value = new Guid(jobID);
                cmd.Parameters.Add(jobIDParam);

                int rowsAffected = cmd.ExecuteNonQuery();

                if (rowsAffected == 0)
                {
                    throw new DeleteAttachmentException(ErrorMessages.DeleteAttachmentFailed);
                }

                return 0;
            }
        }
    }
}