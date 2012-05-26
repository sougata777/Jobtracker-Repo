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
    public class InvoiceDao
    {
        public string GetInvoices(string jobID)
        {
            string invoices = string.Empty;

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
                cmd.CommandText = "GetInvoicesXML";

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
                invoices = sb.ToString();

                reader.Close();
            }

            return invoices;
        }


        public void CreateInvoice(string jobID, string invoiceNumber, string paymentStatusID, string paymentTypeID)
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
                cmd.CommandText = "CreateInvoice";

                SqlParameter jobIDParam = new SqlParameter();
                jobIDParam.ParameterName = "@jobID";
                jobIDParam.Direction = ParameterDirection.Input;
                jobIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                jobIDParam.Value = new Guid(jobID);
                cmd.Parameters.Add(jobIDParam);

                SqlParameter invoiceNumberParam = new SqlParameter();
                invoiceNumberParam.ParameterName = "@invoiceNo";
                invoiceNumberParam.Direction = ParameterDirection.Input;
                invoiceNumberParam.SqlDbType = SqlDbType.VarChar;
                invoiceNumberParam.Value = invoiceNumber;
                cmd.Parameters.Add(invoiceNumberParam);

                SqlParameter paymentStatusIDParam = new SqlParameter();
                paymentStatusIDParam.ParameterName = "@paymentStatusID";
                paymentStatusIDParam.Direction = ParameterDirection.Input;
                paymentStatusIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                paymentStatusIDParam.Value = new Guid(paymentStatusID);
                cmd.Parameters.Add(paymentStatusIDParam);

                SqlParameter paymentTypeIDParam = new SqlParameter();
                paymentTypeIDParam.ParameterName = "@paymentTypeID";
                paymentTypeIDParam.Direction = ParameterDirection.Input;
                paymentTypeIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                paymentTypeIDParam.Value = new Guid(paymentTypeID);
                cmd.Parameters.Add(paymentTypeIDParam);

                int rowsAffected = cmd.ExecuteNonQuery();

                if (rowsAffected == 0)
                {
                    throw new CreateInvoiceException(ErrorMessages.CreateInvoiceFailed);
                }
            }
        }


        public void UpdateInvoice(string invoiceID, string invoiceNumber, string paymentStatusID, string paymentTypeID)
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
                cmd.CommandText = "UpdateInvoice";

                SqlParameter invoiceIDParam = new SqlParameter();
                invoiceIDParam.ParameterName = "@invoiceID";
                invoiceIDParam.Direction = ParameterDirection.Input;
                invoiceIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                invoiceIDParam.Value = new Guid(invoiceID);
                cmd.Parameters.Add(invoiceIDParam);

                SqlParameter invoiceNumberParam = new SqlParameter();
                invoiceNumberParam.ParameterName = "@invoiceNo";
                invoiceNumberParam.Direction = ParameterDirection.Input;
                invoiceNumberParam.SqlDbType = SqlDbType.VarChar;
                invoiceNumberParam.Value = invoiceNumber;
                cmd.Parameters.Add(invoiceNumberParam);

                SqlParameter paymentStatusIDParam = new SqlParameter();
                paymentStatusIDParam.ParameterName = "@paymentStatusID";
                paymentStatusIDParam.Direction = ParameterDirection.Input;
                paymentStatusIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                paymentStatusIDParam.Value = new Guid(paymentStatusID);
                cmd.Parameters.Add(paymentStatusIDParam);

                SqlParameter paymentTypeIDParam = new SqlParameter();
                paymentTypeIDParam.ParameterName = "@paymentTypeID";
                paymentTypeIDParam.Direction = ParameterDirection.Input;
                paymentTypeIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                paymentTypeIDParam.Value = new Guid(paymentTypeID);
                cmd.Parameters.Add(paymentTypeIDParam);

                int rowsAffected = cmd.ExecuteNonQuery();

                if (rowsAffected == 0)
                {
                    throw new UpdateInvoiceException(ErrorMessages.UpdateInvoiceFailed);
                }
            }
        }


        public void DeleteInvoice(string invoiceID)
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
                cmd.CommandText = "DeleteInvoice";

                SqlParameter invoiceIDParam = new SqlParameter();
                invoiceIDParam.ParameterName = "@invoiceID";
                invoiceIDParam.Direction = ParameterDirection.Input;
                invoiceIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                invoiceIDParam.Value = new Guid(invoiceID);
                cmd.Parameters.Add(invoiceIDParam);

                int rowsAffected = cmd.ExecuteNonQuery();

                if (rowsAffected == 0)
                {
                    throw new DeleteInvoiceException(ErrorMessages.DeleteInvoiceFailed);
                }
            }
        }
    }
}