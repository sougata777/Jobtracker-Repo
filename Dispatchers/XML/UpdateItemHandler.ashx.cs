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
    /// Updates an item.
    /// </summary>
    public class UpdateItemHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string itemID = context.Request.Form["ItemID"] ?? string.Empty;
            itemID = HttpUtility.UrlDecode(itemID);
            string itemNumber = context.Request.Form["ItemNumber"] ?? string.Empty;
            itemNumber = HttpUtility.UrlDecode(itemNumber);
            string sku = context.Request.Form["SKU"] ?? string.Empty;
            sku = HttpUtility.UrlDecode(sku);
            string description = context.Request.Form["Description"] ?? string.Empty;
            description = HttpUtility.UrlDecode(description);
            string qty = context.Request.Form["Qty"] ?? string.Empty;
            qty = HttpUtility.UrlDecode(qty);
            string amount = context.Request.Form["Amount"] ?? string.Empty;
            amount = HttpUtility.UrlDecode(amount);

            context.Response.Write(UpdateItem(itemID, itemNumber, sku, description, qty, amount));
        }

        private string UpdateItem(string itemID, string itemNumber, string sku, string description, string qty, string amount)
        {
            try
            {
                new ItemDao().UpdateItem(itemID, itemNumber, sku, description, qty, amount);

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