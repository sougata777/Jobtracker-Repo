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
    public class ItemDao
    {
        public string GetItems(string invoiceID)
        {
            string items = string.Empty;

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
                cmd.CommandText = "GetItemsXML";

                SqlParameter invoiceIDParam = new SqlParameter();
                invoiceIDParam.ParameterName = "@invoiceID";
                invoiceIDParam.Direction = ParameterDirection.Input;
                invoiceIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                invoiceIDParam.Value = new Guid(invoiceID);
                cmd.Parameters.Add(invoiceIDParam);

                XmlReader reader = cmd.ExecuteXmlReader();

                StringBuilder sb = new StringBuilder();
                reader.Read();
                while (!reader.EOF) sb.AppendLine(reader.ReadOuterXml());
                items = sb.ToString();

                reader.Close();
            }

            return items;
        }


        public void CreateItem(string invoiceID, string itemNumber, string sku, string description, string qty, string amount)
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
                cmd.CommandText = "CreateItem";

                SqlParameter invoiceIDParam = new SqlParameter();
                invoiceIDParam.ParameterName = "@invoiceID";
                invoiceIDParam.Direction = ParameterDirection.Input;
                invoiceIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                invoiceIDParam.Value = new Guid(invoiceID);
                cmd.Parameters.Add(invoiceIDParam);

                SqlParameter itemNumberParam = new SqlParameter();
                itemNumberParam.ParameterName = "@itemNo";
                itemNumberParam.Direction = ParameterDirection.Input;
                itemNumberParam.SqlDbType = SqlDbType.VarChar;
                itemNumberParam.Value = itemNumber;
                cmd.Parameters.Add(itemNumberParam);

                SqlParameter skuParam = new SqlParameter();
                skuParam.ParameterName = "@sku";
                skuParam.Direction = ParameterDirection.Input;
                skuParam.SqlDbType = SqlDbType.VarChar;
                skuParam.Value = sku;
                cmd.Parameters.Add(skuParam);

                SqlParameter descriptionParam = new SqlParameter();
                descriptionParam.ParameterName = "@description";
                descriptionParam.Direction = ParameterDirection.Input;
                descriptionParam.SqlDbType = SqlDbType.VarChar;
                descriptionParam.Value = description;
                cmd.Parameters.Add(descriptionParam);

                SqlParameter qtyParam = new SqlParameter();
                qtyParam.ParameterName = "@qty";
                qtyParam.Direction = ParameterDirection.Input;
                qtyParam.SqlDbType = SqlDbType.Int;
                qtyParam.Value = Convert.ToInt32(qty);
                cmd.Parameters.Add(qtyParam);

                SqlParameter amountParam = new SqlParameter();
                amountParam.ParameterName = "@amount";
                amountParam.Direction = ParameterDirection.Input;
                amountParam.SqlDbType = SqlDbType.Decimal;
                amountParam.Value = Convert.ToDecimal(amount);
                cmd.Parameters.Add(amountParam);

                int rowsAffected = cmd.ExecuteNonQuery();

                if (rowsAffected == 0)
                {
                    throw new CreateItemException(ErrorMessages.CreateItemFailed);
                }
            }
        }


        public void UpdateItem(string itemID, string itemNumber, string sku, string description, string qty, string amount)
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
                cmd.CommandText = "UpdateItem";

                SqlParameter itemIDParam = new SqlParameter();
                itemIDParam.ParameterName = "@itemID";
                itemIDParam.Direction = ParameterDirection.Input;
                itemIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                itemIDParam.Value = new Guid(itemID);
                cmd.Parameters.Add(itemIDParam);

                SqlParameter itemNumberParam = new SqlParameter();
                itemNumberParam.ParameterName = "@itemNo";
                itemNumberParam.Direction = ParameterDirection.Input;
                itemNumberParam.SqlDbType = SqlDbType.VarChar;
                itemNumberParam.Value = itemNumber;
                cmd.Parameters.Add(itemNumberParam);

                SqlParameter skuParam = new SqlParameter();
                skuParam.ParameterName = "@sku";
                skuParam.Direction = ParameterDirection.Input;
                skuParam.SqlDbType = SqlDbType.VarChar;
                skuParam.Value = sku;
                cmd.Parameters.Add(skuParam);

                SqlParameter descriptionParam = new SqlParameter();
                descriptionParam.ParameterName = "@description";
                descriptionParam.Direction = ParameterDirection.Input;
                descriptionParam.SqlDbType = SqlDbType.VarChar;
                descriptionParam.Value = description;
                cmd.Parameters.Add(descriptionParam);

                SqlParameter qtyParam = new SqlParameter();
                qtyParam.ParameterName = "@qty";
                qtyParam.Direction = ParameterDirection.Input;
                qtyParam.SqlDbType = SqlDbType.Int;
                qtyParam.Value = Convert.ToInt32(qty);
                cmd.Parameters.Add(qtyParam);

                SqlParameter amountParam = new SqlParameter();
                amountParam.ParameterName = "@amount";
                amountParam.Direction = ParameterDirection.Input;
                amountParam.SqlDbType = SqlDbType.Decimal;
                amountParam.Value = Convert.ToDecimal(amount);
                cmd.Parameters.Add(amountParam);

                int rowsAffected = cmd.ExecuteNonQuery();

                if (rowsAffected == 0)
                {
                    throw new UpdateItemException(ErrorMessages.UpdateItemFailed);
                }
            }
        }


        public void DeleteItem(string itemID)
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
                cmd.CommandText = "DeleteItem";

                SqlParameter itemIDParam = new SqlParameter();
                itemIDParam.ParameterName = "@itemID";
                itemIDParam.Direction = ParameterDirection.Input;
                itemIDParam.SqlDbType = SqlDbType.UniqueIdentifier;
                itemIDParam.Value = new Guid(itemID);
                cmd.Parameters.Add(itemIDParam);

                int rowsAffected = cmd.ExecuteNonQuery();

                if (rowsAffected == 0)
                {
                    throw new DeleteItemException(ErrorMessages.DeleteItemFailed);
                }
            }
        }
    }
}