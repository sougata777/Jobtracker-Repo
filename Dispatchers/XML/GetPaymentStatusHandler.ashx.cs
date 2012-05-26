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
    /// Gets payment status.
    /// </summary>
    public class GetPaymentStatusHandler : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/xml";
            context.Response.Charset = "UTF-8";
            context.Response.Cache.SetNoStore();

            context.Response.Write(GetPaymentStatus());
        }

        private string GetPaymentStatus()
        {
            try
            {
                return new PaymentStatusDao().GetPaymentStatus();
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