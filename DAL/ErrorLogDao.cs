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


namespace JobTracker.DAL
{
    public class ErrorLogDao
    {
        public static void WriteErrorLog(string message)
        {
            try
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
                    cmd.CommandText = "WriteErrorLog";

                    SqlParameter messageParam = new SqlParameter();
                    messageParam.ParameterName = "@message";
                    messageParam.Direction = ParameterDirection.Input;
                    messageParam.SqlDbType = SqlDbType.VarChar;
                    messageParam.Value = message;
                    cmd.Parameters.Add(messageParam);

                    int rowsAffected = cmd.ExecuteNonQuery();
                }
            }
            catch
            {
                // eat the exception
            }
        }
    }
}