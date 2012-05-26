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
using System.Web.UI;
using JobTracker.DAL;
using JobTracker.Utils;
using JobTracker.Resources;


namespace JobTracker.Dispatchers.XML
{
    /// <summary>
    /// Searches for jobs.
    /// </summary>
    public class SearchJobsHandler : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/xml";
            context.Response.Charset = "UTF-8";
            context.Response.Cache.SetNoStore();

            string jobNumber = context.Request.QueryString["JobNumber"] ?? string.Empty;
            jobNumber = HttpUtility.UrlDecode(jobNumber);
            string jobTypeID = context.Request.QueryString["JobTypeID"] ?? string.Empty;
            jobTypeID = HttpUtility.UrlDecode(jobTypeID);
            string jobStatusID = context.Request.QueryString["JobStatusID"] ?? string.Empty;
            jobStatusID = HttpUtility.UrlDecode(jobStatusID);
            string serialNumber = context.Request.QueryString["SerialNumber"] ?? string.Empty;
            serialNumber = HttpUtility.UrlDecode(serialNumber);
            string installDate = context.Request.QueryString["InstallDate"] ?? string.Empty;
            installDate = HttpUtility.UrlDecode(installDate);
            string lastName = context.Request.QueryString["LastName"] ?? string.Empty;
            lastName = HttpUtility.UrlDecode(lastName);
            string invoiceNumber = context.Request.QueryString["InvoiceNumber"] ?? string.Empty;
            invoiceNumber = HttpUtility.UrlDecode(invoiceNumber);
            string paymentStatusID = context.Request.QueryString["PaymentStatusID"] ?? string.Empty;
            paymentStatusID = HttpUtility.UrlDecode(paymentStatusID);
            string itemNumber = context.Request.QueryString["ItemNumber"] ?? string.Empty;
            itemNumber = HttpUtility.UrlDecode(itemNumber);
            string phoneNumber = context.Request.QueryString["PhoneNumber"] ?? string.Empty;
            phoneNumber = HttpUtility.UrlDecode(phoneNumber);

            context.Response.Write(SearchJobs(jobNumber, jobTypeID, jobStatusID, serialNumber, installDate, lastName, invoiceNumber, paymentStatusID, itemNumber, phoneNumber));
        }

        private string SearchJobs(string jobNumber, string jobTypeID, string jobStatusID, string serialNumber, string installDate, string lastName, string invoiceNumber, string paymentStatusID, string itemNumber, string phoneNumber)
        {
            try
            {
                return new JobDao().SearchJobs(jobNumber, jobTypeID, jobStatusID, serialNumber, installDate, lastName, invoiceNumber, paymentStatusID, itemNumber, phoneNumber);
            }
            catch (Exception ex)
            {
                ErrorLogDao.WriteErrorLog(ex.Message + " " + ex.StackTrace);

                return ErrorMessages.DispatcherError;
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}