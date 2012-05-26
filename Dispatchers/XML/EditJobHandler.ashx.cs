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
using System.Text;
using JobTracker.DAL;
using JobTracker.Resources;

namespace JobTracker.Dispatchers.XML
{
    /// <summary>
    /// Gets job details for edit.
    /// </summary>
    public class EditJobHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Cache.SetNoStore();

            string jobID = context.Request.Form["JobID"] ?? string.Empty;

            context.Response.Write(EditJob(jobID));
        }

        private string EditJob(string jobID)
        {
            try
            {
                string jobDetails = new JobDao().GetJobDetails(jobID);

                return jobDetails;
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