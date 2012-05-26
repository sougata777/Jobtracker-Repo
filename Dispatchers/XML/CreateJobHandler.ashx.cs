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
using JobTracker.Resources;

namespace JobTracker.Dispatchers.XML
{
    /// <summary>
    /// Creates a job.
    /// </summary>
    public class CreateJobHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string customerID = context.Request.Form["CustomerID"] ?? string.Empty;
            customerID = HttpUtility.UrlDecode(customerID);
            string jobNumber = context.Request.Form["JobNumber"] ?? string.Empty;
            jobNumber = HttpUtility.UrlDecode(jobNumber);
            string dispatchNumber = context.Request.Form["DispatchNumber"] ?? string.Empty;
            dispatchNumber = HttpUtility.UrlDecode(dispatchNumber);
            string serialNumber = context.Request.Form["SerialNumber"] ?? string.Empty;
            serialNumber = HttpUtility.UrlDecode(serialNumber);
            string salesCheckNumber = context.Request.Form["SalesCheckNumber"] ?? string.Empty;
            salesCheckNumber = HttpUtility.UrlDecode(salesCheckNumber);
            string projectNumber = context.Request.Form["ProjectNumber"] ?? string.Empty;
            projectNumber = HttpUtility.UrlDecode(projectNumber);
            string PONumber = context.Request.Form["PONumber"] ?? string.Empty;
            PONumber = HttpUtility.UrlDecode(PONumber);
            string serviceOrderNumber = context.Request.Form["ServiceOrderNumber"] ?? string.Empty;
            serviceOrderNumber = HttpUtility.UrlDecode(serviceOrderNumber);
            string installDate = context.Request.Form["InstallDate"] ?? string.Empty;
            installDate = HttpUtility.UrlDecode(installDate);
            string jobStatusID = context.Request.Form["JobStatusID"] ?? string.Empty;
            jobStatusID = HttpUtility.UrlDecode(jobStatusID);
            string technician = context.Request.Form["Technician"] ?? string.Empty;
            technician = HttpUtility.UrlDecode(technician);
            string note = context.Request.Form["Note"] ?? string.Empty;
            note = HttpUtility.UrlDecode(note);
            string installFrom = context.Request.Form["InstallFrom"] ?? string.Empty;
            installFrom = HttpUtility.UrlDecode(installFrom);
            string installTo = context.Request.Form["InstallTo"] ?? string.Empty;
            installTo = HttpUtility.UrlDecode(installTo);

            context.Response.Write(CreateJob(customerID, jobNumber, dispatchNumber, serialNumber, salesCheckNumber, projectNumber, PONumber, serviceOrderNumber, installDate, jobStatusID, technician, note, installFrom, installTo));
        }

        private string CreateJob(string customerID, string jobNumber, string dispatchNumber, string serialNumber, string salesCheckNumber, string projectNumber, string PONumber, string serviceOrderNumber, string installDate, string jobStatusID, string technician, string note, string installFrom, string installTo)
        {
            try
            {
                return new JobDao().CreateJob(customerID, jobNumber, dispatchNumber, serialNumber, salesCheckNumber, projectNumber, PONumber, serviceOrderNumber, installDate, jobStatusID, technician, note, installFrom, installTo);
            }
            catch (Exception ex)
            {
                ErrorLogDao.WriteErrorLog(ex.Message + " " + ex.StackTrace);
                return ErrorMessages.DispatcherError;
            }
        }


        private string LoadCustomControl(string controlName)
        {
            Page page = new Page();
            UserControl userControl = (UserControl)page.LoadControl(controlName);
            userControl.EnableViewState = false;
            System.Web.UI.HtmlControls.HtmlForm form = new System.Web.UI.HtmlControls.HtmlForm();
            form.Controls.Add(userControl);
            page.Controls.Add(form);

            System.IO.StringWriter textWriter = new System.IO.StringWriter();
            HttpContext.Current.Server.Execute(page, textWriter, false);
            return textWriter.ToString();
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