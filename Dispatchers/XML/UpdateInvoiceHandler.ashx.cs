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
    /// Updates an invoice.
    /// </summary>
    public class UpdateInvoiceHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string invoiceID = context.Request.Form["InvoiceID"] ?? string.Empty;
            invoiceID = HttpUtility.UrlDecode(invoiceID);
            string invoiceNumber = context.Request.Form["InvoiceNumber"] ?? string.Empty;
            invoiceNumber = HttpUtility.UrlDecode(invoiceNumber);
            string paymentStatusID = context.Request.Form["PaymentStatusID"] ?? string.Empty;
            paymentStatusID = HttpUtility.UrlDecode(paymentStatusID);
            string paymentTypeID = context.Request.Form["PaymentTypeID"] ?? string.Empty;
            paymentTypeID = HttpUtility.UrlDecode(paymentTypeID);

            context.Response.Write(UpdateInvoice(invoiceID, invoiceNumber, paymentStatusID, paymentTypeID));
        }

        private string UpdateInvoice(string invoiceID, string invoiceNumber, string paymentStatusID, string paymentTypeID)
        {
            try
            {
                new InvoiceDao().UpdateInvoice(invoiceID, invoiceNumber, paymentStatusID, paymentTypeID);

                return string.Empty;
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