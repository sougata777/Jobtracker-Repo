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
    /// Saves an attachment.
    /// </summary>
    public class SaveAttachmentHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/html";
            
            string jobID = context.Request.Form["AttachmentJobID"] ?? string.Empty;
            jobID = HttpUtility.UrlDecode(jobID);

            string attachmentName = context.Request.Form["AttachmentName"] ?? string.Empty;
            attachmentName = HttpUtility.UrlDecode(attachmentName);

            context.Response.Write(SaveAttachment(attachmentName, jobID, context));
        }

        private string SaveAttachment(string attachmentName, string jobID, HttpContext context)
        {
            try
            {
                // convert posted file to byte array
                HttpPostedFile myPostedFile = context.Request.Files[0];
                int fileLen = myPostedFile.ContentLength;
                byte[] myData = new byte[fileLen];
                myPostedFile.InputStream.Read(myData, 0, fileLen);

                new JobAttachmentDao().SaveAttachment(attachmentName, jobID, ref myData, myPostedFile.ContentLength, myPostedFile.ContentType);

                return "{\"success\": true}";
            }
            catch(Exception ex)
            {
                ErrorLogDao.WriteErrorLog(ex.Message + " " + ex.StackTrace);
                return "{\"error\": " + ErrorMessages.DispatcherError + "}";
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