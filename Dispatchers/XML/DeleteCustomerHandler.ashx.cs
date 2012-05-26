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
    /// Deletes a customer.
    /// </summary>
    public class DeleteCustomerHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string customerID = context.Request.Form["CustomerID"] ?? string.Empty;
            customerID = HttpUtility.UrlDecode(customerID);

            context.Response.Write(DeleteCustomer(customerID));
        }

        private string DeleteCustomer(string customerID)
        {
            try
            {
                new CustomerDao().DeleteCustomer(customerID);

                return string.Empty;
            }
            catch(Exception ex)
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