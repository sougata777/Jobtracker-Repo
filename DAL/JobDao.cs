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
using System.Xml;
using System.Configuration;
using System.Text;
using JobTracker.DAL.Exceptions;
using JobTracker.Resources;

namespace JobTracker.DAL
{
    public class JobDao
    {
        public string GetJobs(string customerID)
        {           
            string jobs = string.Empty;

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
                cmd.CommandText = "GetJobsXML";

                SqlParameter customerIDParam = new SqlParameter();
                customerIDParam.ParameterName = "@customerID";
                customerIDParam.Direction = ParameterDirection.Input;
                customerIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                customerIDParam.Value = new Guid(customerID);
                cmd.Parameters.Add(customerIDParam);

                XmlReader reader = cmd.ExecuteXmlReader();

                StringBuilder sb = new StringBuilder();
                reader.Read();
                while (!reader.EOF) sb.AppendLine(reader.ReadOuterXml());
                jobs = sb.ToString();

                reader.Close();           
            }

            return jobs;
        }


        public string CreateJob(string customerID, string jobNumber, string dispatchNumber, string serialNumber, string salesCheckNumber, string projectNumber, string PONumber, string serviceOrderNumber, 
            string installDate, string jobStatusID, string technician, string note, string installFrom, string installTo)
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
                cmd.CommandText = "CreateJob";

                SqlParameter customerIDParam = new SqlParameter();
                customerIDParam.ParameterName = "@customerID";
                customerIDParam.Direction = ParameterDirection.Input;
                customerIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                customerIDParam.Value = new Guid(customerID);
                cmd.Parameters.Add(customerIDParam);

                SqlParameter jobNumberParam = new SqlParameter();
                jobNumberParam.ParameterName = "@jobNo";
                jobNumberParam.Direction = ParameterDirection.Input;
                jobNumberParam.SqlDbType = SqlDbType.VarChar;
                jobNumberParam.Value = jobNumber;
                cmd.Parameters.Add(jobNumberParam);

                SqlParameter dispatchNumberParam = new SqlParameter();
                dispatchNumberParam.ParameterName = "@dispatchNo";
                dispatchNumberParam.Direction = ParameterDirection.Input;
                dispatchNumberParam.SqlDbType = SqlDbType.VarChar;
                dispatchNumberParam.Value = dispatchNumber;
                cmd.Parameters.Add(dispatchNumberParam);

                SqlParameter serialNumberParam = new SqlParameter();
                serialNumberParam.ParameterName = "@serialNo";
                serialNumberParam.Direction = ParameterDirection.Input;
                serialNumberParam.SqlDbType = SqlDbType.VarChar;
                serialNumberParam.Value = serialNumber;
                cmd.Parameters.Add(serialNumberParam);

                SqlParameter salesCheckNumberParam = new SqlParameter();
                salesCheckNumberParam.ParameterName = "@salesCheckNo";
                salesCheckNumberParam.Direction = ParameterDirection.Input;
                salesCheckNumberParam.SqlDbType = SqlDbType.VarChar;
                salesCheckNumberParam.Value = salesCheckNumber;
                cmd.Parameters.Add(salesCheckNumberParam);

                SqlParameter projectNumberParam = new SqlParameter();
                projectNumberParam.ParameterName = "@projectNo";
                projectNumberParam.Direction = ParameterDirection.Input;
                projectNumberParam.SqlDbType = SqlDbType.VarChar;
                projectNumberParam.Value = projectNumber;
                cmd.Parameters.Add(projectNumberParam);

                SqlParameter PONumberParam = new SqlParameter();
                PONumberParam.ParameterName = "@PONo";
                PONumberParam.Direction = ParameterDirection.Input;
                PONumberParam.SqlDbType = SqlDbType.VarChar;
                PONumberParam.Value = PONumber;
                cmd.Parameters.Add(PONumberParam);

                SqlParameter serviceOrderNumberParam = new SqlParameter();
                serviceOrderNumberParam.ParameterName = "@serviceOrderNo";
                serviceOrderNumberParam.Direction = ParameterDirection.Input;
                serviceOrderNumberParam.SqlDbType = SqlDbType.VarChar;
                serviceOrderNumberParam.Value = serviceOrderNumber;
                cmd.Parameters.Add(serviceOrderNumberParam);

                SqlParameter installDateParam = new SqlParameter();
                installDateParam.ParameterName = "@installDate";
                installDateParam.Direction = ParameterDirection.Input;
                installDateParam.SqlDbType = SqlDbType.DateTime;
                installDateParam.Value = DateTime.Parse(installDate);
                cmd.Parameters.Add(installDateParam);

                SqlParameter jobStatusIDParam = new SqlParameter();
                jobStatusIDParam.ParameterName = "@jobStatusID";
                jobStatusIDParam.Direction = ParameterDirection.Input;
                jobStatusIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                jobStatusIDParam.Value = new Guid(jobStatusID);
                cmd.Parameters.Add(jobStatusIDParam);

                SqlParameter installFromParam = new SqlParameter();
                installFromParam.ParameterName = "@installFrom";
                installFromParam.Direction = ParameterDirection.Input;
                installFromParam.SqlDbType = SqlDbType.Int;
                installFromParam.Value = Convert.ToInt32(installFrom);
                cmd.Parameters.Add(installFromParam);

                SqlParameter installToParam = new SqlParameter();
                installToParam.ParameterName = "@installTo";
                installToParam.Direction = ParameterDirection.Input;
                installToParam.SqlDbType = SqlDbType.Int;
                installToParam.Value = Convert.ToInt32(installTo);
                cmd.Parameters.Add(installToParam);

                SqlParameter technicianParam = new SqlParameter();
                technicianParam.ParameterName = "@technician";
                technicianParam.Direction = ParameterDirection.Input;
                technicianParam.SqlDbType = SqlDbType.VarChar;
                technicianParam.Value = technician;
                cmd.Parameters.Add(technicianParam);

                SqlParameter noteParam = new SqlParameter();
                noteParam.ParameterName = "@note";
                noteParam.Direction = ParameterDirection.Input;
                noteParam.SqlDbType = SqlDbType.VarChar;
                noteParam.Value = note;
                cmd.Parameters.Add(noteParam);

                SqlParameter jobIDParam = new SqlParameter();
                jobIDParam.ParameterName = "@jobID";
                jobIDParam.Direction = ParameterDirection.Output;
                jobIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                cmd.Parameters.Add(jobIDParam);

                int rowsAffected = cmd.ExecuteNonQuery();

                if (rowsAffected == 0)
                {
                    throw new CreateJobException(ErrorMessages.CreateJobFailed);
                }

                string jobID = ((Guid)cmd.Parameters["@jobID"].Value).ToString();

                return jobID;
            }
        }

        public string GetJobDetails(string jobID)
        {
            string jobDetails = string.Empty;

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
                cmd.CommandText = "GetJobDetailsXML";

                SqlParameter jobIDParam = new SqlParameter();
                jobIDParam.ParameterName = "@jobID";
                jobIDParam.Direction = ParameterDirection.Input;
                jobIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                jobIDParam.Value = new Guid(jobID);
                cmd.Parameters.Add(jobIDParam);

                XmlReader reader = cmd.ExecuteXmlReader();

                StringBuilder sb = new StringBuilder();
                reader.Read();
                while (!reader.EOF) sb.AppendLine(reader.ReadOuterXml());
                jobDetails = sb.ToString();

                reader.Close();

                return jobDetails;
            }
        }

        public void UpdateJob(string jobID, string jobNumber, string dispatchNumber, string serialNumber, string salesCheckNumber, string projectNumber, string PONumber, string serviceOrderNumber,
           string installDate, string jobStatusID, string technician, string note, string installFrom, string installTo)
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
                cmd.CommandText = "UpdateJob";

                SqlParameter jobIDParam = new SqlParameter();
                jobIDParam.ParameterName = "@jobID";
                jobIDParam.Direction = ParameterDirection.Input;
                jobIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                jobIDParam.Value = new Guid(jobID);
                cmd.Parameters.Add(jobIDParam);

                SqlParameter jobNumberParam = new SqlParameter();
                jobNumberParam.ParameterName = "@jobNo";
                jobNumberParam.Direction = ParameterDirection.Input;
                jobNumberParam.SqlDbType = SqlDbType.VarChar;
                jobNumberParam.Value = jobNumber;
                cmd.Parameters.Add(jobNumberParam);

                SqlParameter dispatchNumberParam = new SqlParameter();
                dispatchNumberParam.ParameterName = "@dispatchNo";
                dispatchNumberParam.Direction = ParameterDirection.Input;
                dispatchNumberParam.SqlDbType = SqlDbType.VarChar;
                dispatchNumberParam.Value = dispatchNumber;
                cmd.Parameters.Add(dispatchNumberParam);

                SqlParameter serialNumberParam = new SqlParameter();
                serialNumberParam.ParameterName = "@serialNo";
                serialNumberParam.Direction = ParameterDirection.Input;
                serialNumberParam.SqlDbType = SqlDbType.VarChar;
                serialNumberParam.Value = serialNumber;
                cmd.Parameters.Add(serialNumberParam);

                SqlParameter salesCheckNumberParam = new SqlParameter();
                salesCheckNumberParam.ParameterName = "@salesCheckNo";
                salesCheckNumberParam.Direction = ParameterDirection.Input;
                salesCheckNumberParam.SqlDbType = SqlDbType.VarChar;
                salesCheckNumberParam.Value = salesCheckNumber;
                cmd.Parameters.Add(salesCheckNumberParam);

                SqlParameter projectNumberParam = new SqlParameter();
                projectNumberParam.ParameterName = "@projectNo";
                projectNumberParam.Direction = ParameterDirection.Input;
                projectNumberParam.SqlDbType = SqlDbType.VarChar;
                projectNumberParam.Value = projectNumber;
                cmd.Parameters.Add(projectNumberParam);

                SqlParameter PONumberParam = new SqlParameter();
                PONumberParam.ParameterName = "@PONo";
                PONumberParam.Direction = ParameterDirection.Input;
                PONumberParam.SqlDbType = SqlDbType.VarChar;
                PONumberParam.Value = PONumber;
                cmd.Parameters.Add(PONumberParam);

                SqlParameter serviceOrderNumberParam = new SqlParameter();
                serviceOrderNumberParam.ParameterName = "@serviceOrderNo";
                serviceOrderNumberParam.Direction = ParameterDirection.Input;
                serviceOrderNumberParam.SqlDbType = SqlDbType.VarChar;
                serviceOrderNumberParam.Value = serviceOrderNumber;
                cmd.Parameters.Add(serviceOrderNumberParam);

                SqlParameter installDateParam = new SqlParameter();
                installDateParam.ParameterName = "@installDate";
                installDateParam.Direction = ParameterDirection.Input;
                installDateParam.SqlDbType = SqlDbType.VarChar;
                installDateParam.Value = installDate;
                cmd.Parameters.Add(installDateParam);

                SqlParameter jobStatusIDParam = new SqlParameter();
                jobStatusIDParam.ParameterName = "@jobStatusID";
                jobStatusIDParam.Direction = ParameterDirection.Input;
                jobStatusIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                jobStatusIDParam.Value = new Guid(jobStatusID);
                cmd.Parameters.Add(jobStatusIDParam);

                SqlParameter installFromParam = new SqlParameter();
                installFromParam.ParameterName = "@installFrom";
                installFromParam.Direction = ParameterDirection.Input;
                installFromParam.SqlDbType = SqlDbType.Int;
                installFromParam.Value = Convert.ToInt32(installFrom);
                cmd.Parameters.Add(installFromParam);

                SqlParameter installToParam = new SqlParameter();
                installToParam.ParameterName = "@installTo";
                installToParam.Direction = ParameterDirection.Input;
                installToParam.SqlDbType = SqlDbType.Int;
                installToParam.Value = Convert.ToInt32(installTo);
                cmd.Parameters.Add(installToParam);

                SqlParameter technicianParam = new SqlParameter();
                technicianParam.ParameterName = "@technician";
                technicianParam.Direction = ParameterDirection.Input;
                technicianParam.SqlDbType = SqlDbType.VarChar;
                technicianParam.Value = technician;
                cmd.Parameters.Add(technicianParam);

                SqlParameter noteParam = new SqlParameter();
                noteParam.ParameterName = "@note";
                noteParam.Direction = ParameterDirection.Input;
                noteParam.SqlDbType = SqlDbType.VarChar;
                noteParam.Value = note;
                cmd.Parameters.Add(noteParam);

                int rowsAffected = cmd.ExecuteNonQuery();

                if (rowsAffected == 0)
                {
                    throw new UpdateJobException(ErrorMessages.UpdateJobFailed);
                }
            }
        }


        public void DeleteJob(string jobID)
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
                cmd.CommandText = "DeleteJob";

                SqlParameter jobIDParam = new SqlParameter();
                jobIDParam.ParameterName = "@jobID";
                jobIDParam.Direction = ParameterDirection.Input;
                jobIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                jobIDParam.Value = new Guid(jobID);
                cmd.Parameters.Add(jobIDParam);

                int rowsAffected = cmd.ExecuteNonQuery();

                if (rowsAffected == 0)
                {
                    throw new DeleteJobException(ErrorMessages.DeleteJobFailed);
                }
            }
        }


        public string SearchJobs(string jobNumber, string jobTypeID, string jobStatusID, string serialNumber, string installDate, string lastName, string invoiceNumber, string paymentStatusID, string itemNumber, string phoneNumber)
        {
            string jobs = string.Empty;

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
                cmd.CommandText = GetSearchProcName(jobNumber, jobTypeID, jobStatusID, serialNumber, installDate, lastName, invoiceNumber, paymentStatusID, itemNumber, phoneNumber);

                SqlParameter searchItemParam = new SqlParameter();
                searchItemParam.ParameterName = GetSearchItemParam(jobNumber, jobTypeID, jobStatusID, serialNumber, installDate, lastName, invoiceNumber, paymentStatusID, itemNumber, phoneNumber);
                searchItemParam.Direction = ParameterDirection.Input;
                searchItemParam.SqlDbType = GetSearchItemType(jobNumber, jobTypeID, jobStatusID, serialNumber, installDate, lastName, invoiceNumber, paymentStatusID, itemNumber, phoneNumber);
                searchItemParam.Value = GetSearchItemValue(jobNumber, jobTypeID, jobStatusID, serialNumber, installDate, lastName, invoiceNumber, paymentStatusID, itemNumber, phoneNumber);

                cmd.Parameters.Add(searchItemParam);

                XmlReader reader = cmd.ExecuteXmlReader();

                StringBuilder sb = new StringBuilder();
                reader.Read();
                while (!reader.EOF) sb.AppendLine(reader.ReadOuterXml());
                jobs = sb.ToString();

                reader.Close();
            }

            return jobs;
        }

        private string GetSearchProcName(string jobNumber, string jobTypeID, string jobStatusID, string serialNumber, string installDate, string lastName, string invoiceNumber, string paymentStatusID, string itemNumber, string phoneNumber)
        {
            if (!jobNumber.Equals(string.Empty)) return "SearchJobsXML_JobNumber";
            if (!jobTypeID.Equals(string.Empty)) return "SearchJobsXML_JobType";
            if (!jobStatusID.Equals(string.Empty)) return "SearchJobsXML_JobStatus";
            if (!serialNumber.Equals(string.Empty)) return "SearchJobsXML_SerialNumber";
            if (!installDate.Equals(string.Empty)) return "SearchJobsXML_InstallDate";
            if (!invoiceNumber.Equals(string.Empty)) return "SearchJobsXML_InvoiceNumber";
            if (!paymentStatusID.Equals(string.Empty)) return "SearchJobsXML_PaymentStatus";
            if (!itemNumber.Equals(string.Empty)) return "SearchJobsXML_ItemNumber";
            if (!lastName.Equals(string.Empty)) return "SearchJobsXML_LastName";
            if (!phoneNumber.Equals(string.Empty)) return "SearchJobsXML_PhoneNumber";

            return string.Empty;
        }

        private string GetSearchItemParam(string jobNumber, string jobTypeID, string jobStatusID, string serialNumber, string installDate, string lastName, string invoiceNumber, string paymentStatusID, string itemNumber, string phoneNumber)
        {
            if (!jobNumber.Equals(string.Empty)) return "@jobNo";
            if (!jobTypeID.Equals(string.Empty)) return "@jobTypeID";
            if (!jobStatusID.Equals(string.Empty)) return "@jobStatusID";
            if (!serialNumber.Equals(string.Empty)) return "@serialNo";
            if (!installDate.Equals(string.Empty)) return "@installDate";
            if (!invoiceNumber.Equals(string.Empty)) return "@invoiceNo";
            if (!paymentStatusID.Equals(string.Empty)) return "@paymentStatusID";
            if (!itemNumber.Equals(string.Empty)) return "@itemNo";
            if (!lastName.Equals(string.Empty)) return "@lastName";
            if (!phoneNumber.Equals(string.Empty)) return "@phoneNo";

            return string.Empty;
        }

        private SqlDbType GetSearchItemType(string jobNumber, string jobTypeID, string jobStatusID, string serialNumber, string installDate, string lastName, string invoiceNumber, string paymentStatusID, string itemNumber, string phoneNumber)
        {
            if (!jobNumber.Equals(string.Empty)) return SqlDbType.VarChar;
            if (!jobTypeID.Equals(string.Empty)) return SqlDbType.UniqueIdentifier;
            if (!jobStatusID.Equals(string.Empty)) return SqlDbType.UniqueIdentifier;
            if (!serialNumber.Equals(string.Empty)) return SqlDbType.VarChar;
            if (!installDate.Equals(string.Empty)) return SqlDbType.DateTime;
            if (!invoiceNumber.Equals(string.Empty)) return SqlDbType.VarChar;
            if (!paymentStatusID.Equals(string.Empty)) return SqlDbType.UniqueIdentifier;
            if (!itemNumber.Equals(string.Empty)) return SqlDbType.VarChar;
            if (!lastName.Equals(string.Empty)) return SqlDbType.VarChar;
            if (!phoneNumber.Equals(string.Empty)) return SqlDbType.VarChar;

            return SqlDbType.VarChar;
        }

        private object GetSearchItemValue(string jobNumber, string jobTypeID, string jobStatusID, string serialNumber, string installDate, string lastName, string invoiceNumber, string paymentStatusID, string itemNumber, string phoneNumber)
        {
            if (!jobNumber.Equals(string.Empty)) return jobNumber;
            if (!jobTypeID.Equals(string.Empty)) return new Guid(jobTypeID);
            if (!jobStatusID.Equals(string.Empty)) return new Guid(jobStatusID);
            if (!serialNumber.Equals(string.Empty)) return serialNumber;
            if (!installDate.Equals(string.Empty)) return installDate;
            if (!invoiceNumber.Equals(string.Empty)) return invoiceNumber;
            if (!paymentStatusID.Equals(string.Empty)) return new Guid(paymentStatusID);
            if (!itemNumber.Equals(string.Empty)) return itemNumber;
            if (!lastName.Equals(string.Empty)) return lastName;
            if (!phoneNumber.Equals(string.Empty)) return phoneNumber;

            return null;
        }


        public string GetRoutingSheet()
        {
            string jobs = string.Empty;

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
                cmd.CommandText = "GetRoutingSheetXML";

                XmlReader reader = cmd.ExecuteXmlReader();

                StringBuilder sb = new StringBuilder();
                reader.Read();
                while (!reader.EOF) sb.AppendLine(reader.ReadOuterXml());
                jobs = sb.ToString();

                reader.Close();
            }

            return jobs;
        }
    }
}