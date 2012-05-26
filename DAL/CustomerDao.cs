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
    public class CustomerDao
    {
        public string GetCustomers()
        {
            string customers = string.Empty;

            ConnectionStringSettingsCollection connections = ConfigurationManager.ConnectionStrings;
            string connectionString = connections["JobTrackerConnection"].ConnectionString;
            SqlConnection conn = new SqlConnection(connectionString);
            using (conn)
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = conn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetCustomersXML";

                XmlReader reader = cmd.ExecuteXmlReader();

                StringBuilder sb = new StringBuilder();
                reader.Read();
                while (!reader.EOF) sb.AppendLine(reader.ReadOuterXml());
                customers = sb.ToString();

                reader.Close();
            }

            return customers;
        }

        public string CreateCustomer(string firstName, string lastName, string company, string address1, string address2, string city, string state, string zip, string addressTypeID,
                                   string phone1, string phone2, string phone3, string phoneTypeID1, string phoneTypeID2, string phoneTypeID3, string jobTypeID)
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
                cmd.CommandText = "CreateCustomer";

                SqlParameter firstNameParam = new SqlParameter();
                firstNameParam.ParameterName = "@firstName";
                firstNameParam.Direction = ParameterDirection.Input;
                firstNameParam.SqlDbType = SqlDbType.VarChar;
                firstNameParam.Value = firstName;
                cmd.Parameters.Add(firstNameParam);

                SqlParameter lastNameParam = new SqlParameter();
                lastNameParam.ParameterName = "@lastName";
                lastNameParam.Direction = ParameterDirection.Input;
                lastNameParam.SqlDbType = SqlDbType.VarChar;
                lastNameParam.Value = lastName;
                cmd.Parameters.Add(lastNameParam);

                SqlParameter companyParam = new SqlParameter();
                companyParam.ParameterName = "@company";
                companyParam.Direction = ParameterDirection.Input;
                companyParam.SqlDbType = SqlDbType.VarChar;
                companyParam.Value = company;
                cmd.Parameters.Add(companyParam);

                SqlParameter address1Param = new SqlParameter();
                address1Param.ParameterName = "@address1";
                address1Param.Direction = ParameterDirection.Input;
                address1Param.SqlDbType = SqlDbType.VarChar;
                address1Param.Value = address1;
                cmd.Parameters.Add(address1Param);

                SqlParameter address2Param = new SqlParameter();
                address2Param.ParameterName = "@address2";
                address2Param.Direction = ParameterDirection.Input;
                address2Param.SqlDbType = SqlDbType.VarChar;
                address2Param.Value = address2;
                cmd.Parameters.Add(address2Param);

                SqlParameter cityParam = new SqlParameter();
                cityParam.ParameterName = "@city";
                cityParam.Direction = ParameterDirection.Input;
                cityParam.SqlDbType = SqlDbType.VarChar;
                cityParam.Value = city;
                cmd.Parameters.Add(cityParam);

                SqlParameter stateParam = new SqlParameter();
                stateParam.ParameterName = "@state";
                stateParam.Direction = ParameterDirection.Input;
                stateParam.SqlDbType = SqlDbType.VarChar;
                stateParam.Value = state;
                cmd.Parameters.Add(stateParam);

                SqlParameter zipParam = new SqlParameter();
                zipParam.ParameterName = "@zip";
                zipParam.Direction = ParameterDirection.Input;
                zipParam.SqlDbType = SqlDbType.VarChar;
                zipParam.Value = zip;
                cmd.Parameters.Add(zipParam);

                SqlParameter addressTypeIDParam = new SqlParameter();
                addressTypeIDParam.ParameterName = "@addressTypeID";
                addressTypeIDParam.Direction = ParameterDirection.Input;
                addressTypeIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                addressTypeIDParam.Value = new Guid(addressTypeID);
                cmd.Parameters.Add(addressTypeIDParam);

                SqlParameter phone1Param = new SqlParameter();
                phone1Param.ParameterName = "@phone1";
                phone1Param.Direction = ParameterDirection.Input;
                phone1Param.SqlDbType = SqlDbType.VarChar;
                phone1Param.Value = phone1;
                cmd.Parameters.Add(phone1Param);

                SqlParameter phone2Param = new SqlParameter();
                phone2Param.ParameterName = "@phone2";
                phone2Param.Direction = ParameterDirection.Input;
                phone2Param.SqlDbType = SqlDbType.VarChar;
                phone2Param.Value = phone2;
                cmd.Parameters.Add(phone2Param);

                SqlParameter phone3Param = new SqlParameter();
                phone3Param.ParameterName = "@phone3";
                phone3Param.Direction = ParameterDirection.Input;
                phone3Param.SqlDbType = SqlDbType.VarChar;
                phone3Param.Value = phone3;
                cmd.Parameters.Add(phone3Param);

                SqlParameter phoneTypeID1Param = new SqlParameter();
                phoneTypeID1Param.ParameterName = "@phoneTypeID1";
                phoneTypeID1Param.Direction = ParameterDirection.Input;
                phoneTypeID1Param.SqlDbType = SqlDbType.UniqueIdentifier;
                phoneTypeID1Param.Value = new Guid(phoneTypeID1);
                cmd.Parameters.Add(phoneTypeID1Param);

                SqlParameter phoneTypeID2Param = new SqlParameter();
                phoneTypeID2Param.ParameterName = "@phoneTypeID2";
                phoneTypeID2Param.Direction = ParameterDirection.Input;
                phoneTypeID2Param.SqlDbType = SqlDbType.UniqueIdentifier;
                phoneTypeID2Param.Value = new Guid(phoneTypeID2);
                cmd.Parameters.Add(phoneTypeID2Param);

                SqlParameter phoneTypeID3Param = new SqlParameter();
                phoneTypeID3Param.ParameterName = "@phoneTypeID3";
                phoneTypeID3Param.Direction = ParameterDirection.Input;
                phoneTypeID3Param.SqlDbType = SqlDbType.UniqueIdentifier;
                phoneTypeID3Param.Value = new Guid(phoneTypeID3);
                cmd.Parameters.Add(phoneTypeID3Param);

                SqlParameter jobTypeIDParam = new SqlParameter();
                jobTypeIDParam.ParameterName = "@jobTypeID";
                jobTypeIDParam.Direction = ParameterDirection.Input;
                jobTypeIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                jobTypeIDParam.Value = new Guid(jobTypeID);
                cmd.Parameters.Add(jobTypeIDParam);

                SqlParameter customerIDParam = new SqlParameter();
                customerIDParam.ParameterName = "@customerID";
                customerIDParam.Direction = ParameterDirection.Output;
                customerIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                cmd.Parameters.Add(customerIDParam);

                int rowsAffected = cmd.ExecuteNonQuery();

                if (rowsAffected == 0)
                {
                    throw new CreateCustomerException(ErrorMessages.CreateCustomerFailed);
                }

                string customerID = ((Guid)cmd.Parameters["@customerID"].Value).ToString();

                return customerID;
            }
        }


        public string GetCustomerDetails(string customerID)
        {
            string customerDetails = string.Empty;

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
                cmd.CommandText = "GetCustomerDetailsXML";

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
                customerDetails = sb.ToString();

                reader.Close();

                return customerDetails;
            }
        }

        public void UpdateCustomer(string customerID, string firstName, string lastName, string company, string address1, string address2, string city, string state, string zip, string addressTypeID,
                                   string phone1, string phone2, string phone3, string phoneTypeID1, string phoneTypeID2, string phoneTypeID3, string jobTypeID)
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
                cmd.CommandText = "UpdateCustomer";

                SqlParameter customerIDParam = new SqlParameter();
                customerIDParam.ParameterName = "@customerID";
                customerIDParam.Direction = ParameterDirection.Input;
                customerIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                customerIDParam.Value = new Guid(customerID);
                cmd.Parameters.Add(customerIDParam);

                SqlParameter firstNameParam = new SqlParameter();
                firstNameParam.ParameterName = "@firstName";
                firstNameParam.Direction = ParameterDirection.Input;
                firstNameParam.SqlDbType = SqlDbType.VarChar;
                firstNameParam.Value = firstName;
                cmd.Parameters.Add(firstNameParam);

                SqlParameter lastNameParam = new SqlParameter();
                lastNameParam.ParameterName = "@lastName";
                lastNameParam.Direction = ParameterDirection.Input;
                lastNameParam.SqlDbType = SqlDbType.VarChar;
                lastNameParam.Value = lastName;
                cmd.Parameters.Add(lastNameParam);

                SqlParameter companyParam = new SqlParameter();
                companyParam.ParameterName = "@company";
                companyParam.Direction = ParameterDirection.Input;
                companyParam.SqlDbType = SqlDbType.VarChar;
                companyParam.Value = company;
                cmd.Parameters.Add(companyParam);

                SqlParameter address1Param = new SqlParameter();
                address1Param.ParameterName = "@address1";
                address1Param.Direction = ParameterDirection.Input;
                address1Param.SqlDbType = SqlDbType.VarChar;
                address1Param.Value = address1;
                cmd.Parameters.Add(address1Param);

                SqlParameter address2Param = new SqlParameter();
                address2Param.ParameterName = "@address2";
                address2Param.Direction = ParameterDirection.Input;
                address2Param.SqlDbType = SqlDbType.VarChar;
                address2Param.Value = address2;
                cmd.Parameters.Add(address2Param);

                SqlParameter cityParam = new SqlParameter();
                cityParam.ParameterName = "@city";
                cityParam.Direction = ParameterDirection.Input;
                cityParam.SqlDbType = SqlDbType.VarChar;
                cityParam.Value = city;
                cmd.Parameters.Add(cityParam);

                SqlParameter stateParam = new SqlParameter();
                stateParam.ParameterName = "@state";
                stateParam.Direction = ParameterDirection.Input;
                stateParam.SqlDbType = SqlDbType.VarChar;
                stateParam.Value = state;
                cmd.Parameters.Add(stateParam);

                SqlParameter zipParam = new SqlParameter();
                zipParam.ParameterName = "@zip";
                zipParam.Direction = ParameterDirection.Input;
                zipParam.SqlDbType = SqlDbType.VarChar;
                zipParam.Value = zip;
                cmd.Parameters.Add(zipParam);

                SqlParameter addressTypeIDParam = new SqlParameter();
                addressTypeIDParam.ParameterName = "@addressTypeID";
                addressTypeIDParam.Direction = ParameterDirection.Input;
                addressTypeIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                addressTypeIDParam.Value = new Guid(addressTypeID);
                cmd.Parameters.Add(addressTypeIDParam);

                SqlParameter phone1Param = new SqlParameter();
                phone1Param.ParameterName = "@phone1";
                phone1Param.Direction = ParameterDirection.Input;
                phone1Param.SqlDbType = SqlDbType.VarChar;
                phone1Param.Value = phone1;
                cmd.Parameters.Add(phone1Param);

                SqlParameter phone2Param = new SqlParameter();
                phone2Param.ParameterName = "@phone2";
                phone2Param.Direction = ParameterDirection.Input;
                phone2Param.SqlDbType = SqlDbType.VarChar;
                phone2Param.Value = phone2;
                cmd.Parameters.Add(phone2Param);

                SqlParameter phone3Param = new SqlParameter();
                phone3Param.ParameterName = "@phone3";
                phone3Param.Direction = ParameterDirection.Input;
                phone3Param.SqlDbType = SqlDbType.VarChar;
                phone3Param.Value = phone3;
                cmd.Parameters.Add(phone3Param);

                SqlParameter phoneTypeID1Param = new SqlParameter();
                phoneTypeID1Param.ParameterName = "@phoneTypeID1";
                phoneTypeID1Param.Direction = ParameterDirection.Input;
                phoneTypeID1Param.SqlDbType = SqlDbType.UniqueIdentifier;
                phoneTypeID1Param.Value = new Guid(phoneTypeID1);
                cmd.Parameters.Add(phoneTypeID1Param);

                SqlParameter phoneTypeID2Param = new SqlParameter();
                phoneTypeID2Param.ParameterName = "@phoneTypeID2";
                phoneTypeID2Param.Direction = ParameterDirection.Input;
                phoneTypeID2Param.SqlDbType = SqlDbType.UniqueIdentifier;
                phoneTypeID2Param.Value = new Guid(phoneTypeID2);
                cmd.Parameters.Add(phoneTypeID2Param);

                SqlParameter phoneTypeID3Param = new SqlParameter();
                phoneTypeID3Param.ParameterName = "@phoneTypeID3";
                phoneTypeID3Param.Direction = ParameterDirection.Input;
                phoneTypeID3Param.SqlDbType = SqlDbType.UniqueIdentifier;
                phoneTypeID3Param.Value = new Guid(phoneTypeID3);
                cmd.Parameters.Add(phoneTypeID3Param);

                SqlParameter jobTypeIDParam = new SqlParameter();
                jobTypeIDParam.ParameterName = "@jobTypeID";
                jobTypeIDParam.Direction = ParameterDirection.Input;
                jobTypeIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                jobTypeIDParam.Value = new Guid(jobTypeID);
                cmd.Parameters.Add(jobTypeIDParam);

                int rowsAffected = cmd.ExecuteNonQuery();

                if (rowsAffected == 0)
                {
                    throw new UpdateCustomerException(ErrorMessages.UpdateCustomerFailed);
                }
            }
        }

        public void DeleteCustomer(string customerID)
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
                cmd.CommandText = "DeleteCustomer";

                SqlParameter customerIDParam = new SqlParameter();
                customerIDParam.ParameterName = "@customerID";
                customerIDParam.Direction = ParameterDirection.Input;
                customerIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                customerIDParam.Value = new Guid(customerID);
                cmd.Parameters.Add(customerIDParam);

                int rowsAffected = cmd.ExecuteNonQuery();

                if (rowsAffected == 0)
                {
                    throw new DeleteCustomerException(ErrorMessages.DeleteCustomerFailed);
                }
            }
        }
    }
}