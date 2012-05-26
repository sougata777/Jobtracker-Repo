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
using Microsoft.Practices.EnterpriseLibrary.Caching;
using Microsoft.Practices.EnterpriseLibrary.Caching.Expirations;

namespace JobTracker.DAL
{
    public class JobStatusDao
    {
        public string GetJobStatus()
        {
            ICacheManager cacheManager = CacheFactory.GetCacheManager("Cache Manager");
            string jobStatus = (string)cacheManager.GetData("JobStatusXML");

            if (null == jobStatus)
            {
                jobStatus = string.Empty;

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
                    cmd.CommandText = "GetJobStatusXML";

                    XmlReader reader = cmd.ExecuteXmlReader();

                    StringBuilder sb = new StringBuilder();
                    reader.Read();
                    while (!reader.EOF) sb.AppendLine(reader.ReadOuterXml());
                    jobStatus = sb.ToString();

                    reader.Close();

                    cacheManager.Add("JobStatusXML", jobStatus);
                }
            }

            return jobStatus;
        }
    }
}