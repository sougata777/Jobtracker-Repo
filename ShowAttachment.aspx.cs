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
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Text;
using JobTracker.DAL;
using JobTracker.Entity;

namespace JobTracker
{
    public partial class ShowAttachment : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string jobID = (Request.QueryString["JobID"] == null) ? string.Empty : Request.QueryString["JobID"].ToString();

            if (jobID.Equals(string.Empty)) return;

            try
            {
                JobTracker.Entity.JobAttachment ja = new JobAttachmentDao().GetAttachment(jobID);

                Response.Clear();
                Response.ContentType = ja.ContentType;
                Response.OutputStream.Write((byte[])ja.Attachment, 0, (int)ja.ContentLength);
                Response.End();
            }
            catch (System.Threading.ThreadAbortException)
            {
                // ignore this exception
            }
            catch (Exception ex)
            {
                ErrorLogDao.WriteErrorLog(ex.Message + " " + ex.StackTrace);
            }
        }
    }
}
