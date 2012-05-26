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
    /// Creates a customer.
    /// </summary>
    public class CreateCustomerHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string firstName = context.Request.Form["FirstName"] ?? string.Empty;
            firstName = HttpUtility.UrlDecode(firstName);
            string lastName = context.Request.Form["LastName"] ?? string.Empty;
            lastName = HttpUtility.UrlDecode(lastName);
            string company = context.Request.Form["Company"] ?? string.Empty;
            company = HttpUtility.UrlDecode(company);
            string address1 = context.Request.Form["Address1"] ?? string.Empty;
            address1 = HttpUtility.UrlDecode(address1);
            string address2 = context.Request.Form["Address2"] ?? string.Empty;
            address2 = HttpUtility.UrlDecode(address2);
            string city = context.Request.Form["City"] ?? string.Empty;
            city = HttpUtility.UrlDecode(city);
            string state = context.Request.Form["State"] ?? string.Empty;
            state = HttpUtility.UrlDecode(state);
            string zip = context.Request.Form["Zip"] ?? string.Empty;
            zip = HttpUtility.UrlDecode(zip);
            string addressTypeID = context.Request.Form["AddressTypeID"] ?? string.Empty;
            addressTypeID = HttpUtility.UrlDecode(addressTypeID);
            string phone1 = context.Request.Form["Phone1"] ?? string.Empty;
            phone1 = HttpUtility.UrlDecode(phone1);
            string phone2 = context.Request.Form["Phone2"] ?? string.Empty;
            phone2 = HttpUtility.UrlDecode(phone2);
            string phone3 = context.Request.Form["Phone3"] ?? string.Empty;
            phone3 = HttpUtility.UrlDecode(phone3);
            string phoneTypeID1 = context.Request.Form["PhoneTypeID1"] ?? string.Empty;
            phoneTypeID1 = HttpUtility.UrlDecode(phoneTypeID1);
            string phoneTypeID2 = context.Request.Form["PhoneTypeID2"] ?? string.Empty;
            phoneTypeID2 = HttpUtility.UrlDecode(phoneTypeID2);
            string phoneTypeID3 = context.Request.Form["PhoneTypeID3"] ?? string.Empty;
            phoneTypeID3 = HttpUtility.UrlDecode(phoneTypeID3);
            string jobTypeID = context.Request.Form["JobType"] ?? string.Empty;
            jobTypeID = HttpUtility.UrlDecode(jobTypeID);

            context.Response.Write(CreateCustomer(firstName, lastName, company, address1, address2, city, state, zip, addressTypeID, phone1, phone2, phone3, phoneTypeID1, phoneTypeID2, phoneTypeID3, jobTypeID));
        }

        private string CreateCustomer(string firstName, string lastName, string company, string address1, string address2, string city, string state, string zip, string addressTypeID,
                                        string phone1, string phone2, string phone3, string phoneTypeID1, string phoneTypeID2, string phoneTypeID3, string jobTypeID)
        {
            try
            {
                return new CustomerDao().CreateCustomer(firstName, lastName, company, address1, address2, city, state, zip, addressTypeID, phone1, phone2, phone3, phoneTypeID1, phoneTypeID2, phoneTypeID3, jobTypeID);
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