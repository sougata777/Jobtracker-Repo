<%@ Page Title="Manage Jobs" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeBehind="Jobs.aspx.cs" Inherits="JobTracker.Jobs" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
    
    <style type="text/css">
        a:link {color:#2e408c;}   
        a:visited {color:#2e408c;}
        a:hover {color:#2e408c;}
        a:active {color:#2e408c;}    
        
        .newJobIcon {
            background-image: url(Images/clipboard_add.png) !important;
        }    
        
        .printJobsIcon {
            background-image: url(Images/printer_32.png) !important;
        }
        
        .defaultActionButtonIcon {
            background-image: url(Images/check_mark_16.png) !important;
        }
        
        .cancelButtonIcon {
            background-image: url(Images/close_16.png) !important;
        }
        
        .uploadButtonIcon {
            background-image: url(Images/up_16.png) !important;
        }
    </style>

    <script type="text/javascript" src="Scripts/jobtracker/model/job.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/model/jobstatus.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/model/invoice.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/model/item.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/model/paymenttype.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/model/paymentstatus.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/model/attachment.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/model/interval.js"></script>

    <script type="text/javascript" src="Scripts/jobtracker/view/joblist.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/view/customerlabel.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/view/joblabel.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/view/invoicelabel.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/view/addattachmentform.js"></script>

    <script type="text/javascript" src="Scripts/jobtracker/controller/jobcontroller.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/controller/invoicecontroller.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/controller/itemcontroller.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/controller/printcontroller.js"></script>       

    <script type="text/javascript">
        Ext.require(['Ext.data.*']);

        Ext.onReady(function () {
            var pageParameters = Ext.urlDecode(window.location.search.substring(1));

            var nj = newJobButton();
            var pj = printJobsButton();

            if (pageParameters.CustomerID == null || pageParameters.CustomerID == '') {
                nj.setVisible(false);
                pj.setVisible(false);
            }

            var clb = createCustomerLabel(pageParameters);
            var jl = listJobs(pageParameters);

            var cj = createJobForm(pageParameters);
            var ej = editJobForm(pageParameters);

            var ci = createInvoiceForm();
            var ei = editInvoiceForm();

            var cit = createItemForm();
            var eit = editItemForm();

            var jlb = createJobLabel();
            var ilb = createInvoiceLabel();

            var att = addAttachmentForm();

            // hook up event handlers
            jl.relayEvents(pj, ['printJobs']);

            jl.on('printJobs', function () {
                printJobsPage(pageParameters.CustomerID);
            });

            cj.relayEvents(nj, ['newJob']);
            ej.relayEvents(nj, ['newJob']);
            ci.relayEvents(nj, ['newJob']);
            ei.relayEvents(nj, ['newJob']);
            cit.relayEvents(nj, ['newJob']);
            eit.relayEvents(nj, ['newJob']);
            jlb.relayEvents(nj, ['newJob']);
            ilb.relayEvents(nj, ['newJob']);

            cj.on('newJob', function () {
                cj.setWidth(0);
                clearJobForm();
                cj.setVisible(true);
                Ext.create('Ext.fx.Anim', {
                    target: cj,
                    duration: 500,
                    from: {
                        width: 20
                    },
                    to: {
                        width: 570
                    }
                });
            });

            ej.on('newJob', function () {
                ej.setVisible(false);
            });

            ci.on('newJob', function () {
                ci.setVisible(false);
            });

            ei.on('newJob', function () {
                ei.setVisible(false);
            });

            cit.on('newJob', function () {
                cit.setVisible(false);
            });

            eit.on('newJob', function () {
                eit.setVisible(false);
            });

            jlb.on('newJob', function () {
                jlb.setVisible(false);
            });

            ilb.on('newJob', function () {
                ilb.setVisible(false);
            });


            cj.on('cancelNewJob', function () {
                cj.setVisible(false);
            });


            cj.on('createJob', function (customerID, jobNumber, PONumber, dispatchNumber, serviceOrderNumber, serialNumber, salesCheckNumber, projectNumber, installDate, jobStatusID, technician, notes, installFrom, installTo) {
                createJob(customerID, jobNumber, PONumber, dispatchNumber, serviceOrderNumber, serialNumber, salesCheckNumber, projectNumber, installDate, jobStatusID, technician, notes, installFrom, installTo);
            });


            cj.on('jobCreated', function () {
                clearJobForm();
                jobCreated();
            });

            jl.relayEvents(cj, ['jobCreated']);

            jl.on('jobCreated', function (jobID) {
                refreshJobList(jobID);
            });


            cj.on('createJobFailed', function () {
                createJobFailed();
            });


            jl.on('jobDeleted', function () {
                jobDeleted();
                refreshJobList();
            });

            jl.on('deleteJobFailed', function () {
                deleteJobFailed();
            });


            ej.on('cancelUpdateJob', function () {
                ej.setVisible(false);
            });


            cj.relayEvents(jl, ['jobSelected']);
            ej.relayEvents(jl, ['jobSelected']);
            ci.relayEvents(jl, ['jobSelected']);
            ei.relayEvents(jl, ['jobSelected']);
            cit.relayEvents(jl, ['jobSelected']);
            eit.relayEvents(jl, ['jobSelected']);
            jlb.relayEvents(jl, ['jobSelected']);
            ilb.relayEvents(jl, ['jobSelected']);

            cj.on('jobSelected', function () {
                cj.setVisible(false);
            });

            ej.on('jobSelected', function (jobID) {
                ej.setWidth(0);
                ej.setVisible(true);
                Ext.create('Ext.fx.Anim', {
                    target: ej,
                    duration: 500,
                    from: {
                        width: 20
                    },
                    to: {
                        width: 570
                    }
                });
                editJob(jobID);
            });

            ci.on('jobSelected', function () {
                ci.setVisible(false);
            });

            ei.on('jobSelected', function () {
                ei.setVisible(false);
            });

            cit.on('jobSelected', function () {
                cit.setVisible(false);
            });

            eit.on('jobSelected', function () {
                eit.setVisible(false);
            });

            jlb.on('jobSelected', function () {
                jlb.setVisible(false);
            });

            ilb.on('jobSelected', function () {
                ilb.setVisible(false);
            });


            ej.on('editJobFailed', function () {
                editJobFailed();
            });


            ej.on('updateJob', function (jobID, jobNumber, PONumber, dispatchNumber, serviceOrderNumber, serialNumber, salesCheckNumber, projectNumber, installDate, jobStatusID, technician, notes, installFrom, installTo) {
                updateJob(jobID, jobNumber, PONumber, dispatchNumber, serviceOrderNumber, serialNumber, salesCheckNumber, projectNumber, installDate, jobStatusID, technician, notes, installFrom, installTo);
            });


            ej.on('jobUpdated', function () {
                jobUpdated();
            });

            ej.on('updateJobFailed', function () {
                updateJobFailed();
            });

            jl.relayEvents(ej, ['jobUpdated']);

            jl.on('jobUpdated', function () {
                refreshJobList();
            });


            cj.relayEvents(jl, ['newInvoice']);
            ej.relayEvents(jl, ['newInvoice']);
            ci.relayEvents(jl, ['newInvoice']);
            ei.relayEvents(jl, ['newInvoice']);
            cit.relayEvents(jl, ['newInvoice']);
            eit.relayEvents(jl, ['newInvoice']);
            jlb.relayEvents(jl, ['newInvoice']);
            ilb.relayEvents(jl, ['newInvoice']);

            cj.on('newInvoice', function (jobID) {
                cj.setVisible(false);
            });

            ej.on('newInvoice', function (jobID) {
                ej.setVisible(false);
            });

            ci.on('newInvoice', function (jobID) {
                clearInvoiceForm();
                assignInvoiceToJob(jobID);
                ci.setVisible(true);
                ci.setWidth(0);
                Ext.create('Ext.fx.Anim', {
                    target: ci,
                    duration: 500,
                    from: {
                        width: 20
                    },
                    to: {
                        width: 360
                    }
                });
            });

            ei.on('newInvoice', function (jobID) {
                ei.setVisible(false);
            });

            cit.on('newInvoice', function (jobID) {
                cit.setVisible(false);
            });

            eit.on('newInvoice', function (jobID) {
                eit.setVisible(false);
            });

            jlb.on('newInvoice', function (jobID, jobNumber, installDate) {
                jlb.setVisible(true);
                fillOutJobLabel(jobID, jobNumber, installDate);
            });

            ilb.on('newInvoice', function (jobID) {
                ilb.setVisible(false);
            });


            ci.on('cancelAddInvoice', function () {
                ci.setVisible(false);
            });

            jlb.relayEvents(ci, ['cancelAddInvoice']);

            jlb.on('cancelAddInvoice', function () {
                jlb.setVisible(false);
            });


            ci.on('addInvoice', function (jobID, invoiceNumber, paymentStatusID, paymentTypeID) {
                createInvoice(jobID, invoiceNumber, paymentStatusID, paymentTypeID);
            });


            ci.on('invoiceCreated', function () {
                clearInvoiceForm();
                invoiceCreated();
            });


            ci.on('createInvoiceFailed', function () {
                createInvoiceFailed();
            });


            jl.relayEvents(ci, ['invoiceCreated']);

            jl.on('invoiceCreated', function () {
                refreshJobList();
            });

            ei.on('cancelUpdateInvoice', function () {
                ei.setVisible(false);
            });

            jlb.relayEvents(ei, ['cancelUpdateInvoice']);

            jlb.on('cancelUpdateInvoice', function () {
                jlb.setVisible(false);
            });

            cj.relayEvents(jl, ['editInvoice']);
            ej.relayEvents(jl, ['editInvoice']);
            ci.relayEvents(jl, ['editInvoice']);
            ei.relayEvents(jl, ['editInvoice']);
            cit.relayEvents(jl, ['editInvoice']);
            eit.relayEvents(jl, ['editInvoice']);
            jlb.relayEvents(jl, ['editInvoice']);
            ilb.relayEvents(jl, ['editInvoice']);

            cj.on('editInvoice', function (invoiceID, invoiceNumber, paymentStatusID, paymentTypeID) {
                cj.setVisible(false);
            });

            ej.on('editInvoice', function (invoiceID, invoiceNumber, paymentStatusID, paymentTypeID) {
                ej.setVisible(false);
            });

            ci.on('editInvoice', function (invoiceID, invoiceNumber, paymentStatusID, paymentTypeID) {
                ci.setVisible(false);
            });

            ei.on('editInvoice', function (invoiceID, invoiceNumber, paymentStatusID, paymentTypeID) {
                ei.setWidth(0);
                ei.setVisible(true);
                Ext.create('Ext.fx.Anim', {
                    target: ei,
                    duration: 500,
                    from: {
                        width: 20
                    },
                    to: {
                        width: 360
                    }
                });
                editInvoice(invoiceID, invoiceNumber, paymentStatusID, paymentTypeID);
            });

            cit.on('editInvoice', function (invoiceID, invoiceNumber, paymentStatusID, paymentTypeID) {
                cit.setVisible(false);
            });

            eit.on('editInvoice', function (invoiceID, invoiceNumber, paymentStatusID, paymentTypeID) {
                eit.setVisible(false);
            });

            jlb.on('editInvoice', function (invoiceID, invoiceNumber, paymentStatusID, paymentTypeID, jobID, jobNumber, installDate) {
                jlb.setVisible(true);
                fillOutJobLabel(jobID, jobNumber, installDate);
            });

            ilb.on('editInvoice', function (invoiceID, invoiceNumber, paymentStatusID, paymentTypeID) {
                ilb.setVisible(false);
            });


            ei.on('editInvoiceFailed', function () {
                editInvoiceFailed();
            });


            ei.on('updateInvoice', function (invoiceID, invoiceNumber, paymentStatusID, paymentTypeID) {
                updateInvoice(invoiceID, invoiceNumber, paymentStatusID, paymentTypeID);
            });


            ei.on('invoiceUpdated', function () {
                invoiceUpdated();
            });


            ei.on('updateInvoiceFailed', function () {
                updateInvoiceFailed();
            });


            jl.relayEvents(ei, ['invoiceUpdated']);

            jl.on('invoiceUpdated', function () {
                refreshJobList();
            });


            jl.on('invoiceDeleted', function () {
                invoiceDeleted();
                refreshJobList();
            });

            jl.on('deleteInvoiceFailed', function () {
                deleteInvoiceFailed();
            });


            cj.relayEvents(jl, ['newItem']);
            ej.relayEvents(jl, ['newItem']);
            ci.relayEvents(jl, ['newItem']);
            ei.relayEvents(jl, ['newItem']);
            cit.relayEvents(jl, ['newItem']);
            eit.relayEvents(jl, ['newItem']);
            jlb.relayEvents(jl, ['newItem']);
            ilb.relayEvents(jl, ['newItem']);

            cj.on('newItem', function (invoiceID) {
                cj.setVisible(false);
            });

            ej.on('newItem', function (invoiceID) {
                ej.setVisible(false);
            });

            ci.on('newItem', function (invoiceID) {
                ci.setVisible(false);
            });

            ei.on('newItem', function (invoiceID) {
                ei.setVisible(false);
            });

            cit.on('newItem', function (invoiceID) {
                clearItemForm();
                assignItemToInvoice(invoiceID);
                cit.setWidth(0);
                cit.setVisible(true);
                Ext.create('Ext.fx.Anim', {
                    target: cit,
                    duration: 500,
                    from: {
                        width: 20
                    },
                    to: {
                        width: 360
                    }
                });
            });

            eit.on('newItem', function (invoiceID) {
                eit.setVisible(false);
            });

            jlb.on('newItem', function (invoiceID, jobID, jobNumber, installDate) {
                jlb.setVisible(true);
                fillOutJobLabel(jobID, jobNumber, installDate);
            });

            ilb.on('newItem', function (invoiceID, jobID, jobNumber, installDate, invoiceNumber) {
                ilb.setVisible(true);
                fillOutInvoiceLabel(invoiceNumber);
            });


            cit.on('cancelAddItem', function () {
                cit.setVisible(false);
            });

            jlb.relayEvents(cit, ['cancelAddItem']);

            jlb.on('cancelAddItem', function () {
                jlb.setVisible(false);
            });

            ilb.relayEvents(cit, ['cancelAddItem']);

            ilb.on('cancelAddItem', function () {
                ilb.setVisible(false);
            });


            cit.on('addItem', function (invoiceID, itemNumber, sku, description, qty, amount) {
                createItem(invoiceID, itemNumber, sku, description, qty, amount);
            });


            cit.on('itemCreated', function () {
                clearItemForm();
                itemCreated();
            });


            cit.on('createItemFailed', function () {
                createItemFailed();
            });


            jl.relayEvents(cit, ['itemCreated']);

            jl.on('itemCreated', function () {
                refreshJobList();
            });

            eit.on('cancelUpdateItem', function () {
                eit.setVisible(false);
            });

            jlb.relayEvents(eit, ['cancelUpdateItem']);

            jlb.on('cancelUpdateItem', function () {
                jlb.setVisible(false);
            });

            ilb.relayEvents(eit, ['cancelUpdateItem']);

            ilb.on('cancelUpdateItem', function () {
                ilb.setVisible(false);
            });

            cj.relayEvents(jl, ['editItem']);
            ej.relayEvents(jl, ['editItem']);
            ci.relayEvents(jl, ['editItem']);
            ei.relayEvents(jl, ['editItem']);
            cit.relayEvents(jl, ['editItem']);
            eit.relayEvents(jl, ['editItem']);
            jlb.relayEvents(jl, ['editItem']);
            ilb.relayEvents(jl, ['editItem']);

            cj.on('editItem', function (itemID, itemNumber, sku, description, qty, amount) {
                cj.setVisible(false);
            });

            ej.on('editItem', function (itemID, itemNumber, sku, description, qty, amount) {
                ej.setVisible(false);
            });

            ci.on('editItem', function (itemID, itemNumber, sku, description, qty, amount) {
                ci.setVisible(false);
            });

            ei.on('editItem', function (itemID, itemNumber, sku, description, qty, amount) {
                ei.setVisible(false);
            });

            cit.on('editItem', function (itemID, itemNumber, sku, description, qty, amount) {
                cit.setVisible(false);
            });

            eit.on('editItem', function (itemID, itemNumber, sku, description, qty, amount) {
                eit.setWidth(0);
                eit.setVisible(true);
                Ext.create('Ext.fx.Anim', {
                    target: eit,
                    duration: 500,
                    from: {
                        width: 20
                    },
                    to: {
                        width: 360
                    }
                });
                editItem(itemID, itemNumber, sku, description, qty, amount);
            });

            jlb.on('editItem', function (itemID, itemNumber, sku, description, qty, amount, jobID, jobNumber, installDate) {
                jlb.setVisible(true);
                fillOutJobLabel(jobID, jobNumber, installDate);
            });

            ilb.on('editItem', function (itemID, itemNumber, sku, description, qty, amount, jobID, jobNumber, installDate, invoiceNumber) {
                ilb.setVisible(true);
                fillOutInvoiceLabel(invoiceNumber);
            });



            eit.on('editItemFailed', function () {
                editItemFailed();
            });


            eit.on('updateItem', function (itemID, itemNumber, sku, description, qty, amount) {
                updateItem(itemID, itemNumber, sku, description, qty, amount);
            });


            eit.on('itemUpdated', function () {
                itemUpdated();
            });


            eit.on('updateItemFailed', function () {
                updateItemFailed();
            });


            jl.relayEvents(eit, ['itemUpdated']);

            jl.on('itemUpdated', function () {
                refreshJobList();
            });


            jl.on('itemDeleted', function () {
                itemDeleted();
                refreshJobList();
            });

            jl.on('deleteItemFailed', function () {
                deleteItemFailed();
            });


            cj.relayEvents(jl, ['jobDeleted']);
            ej.relayEvents(jl, ['jobDeleted']);
            ci.relayEvents(jl, ['jobDeleted']);
            ei.relayEvents(jl, ['jobDeleted']);
            cit.relayEvents(jl, ['jobDeleted']);
            eit.relayEvents(jl, ['jobDeleted']);
            jlb.relayEvents(jl, ['jobDeleted']);
            ilb.relayEvents(jl, ['jobDeleted']);

            cj.on('jobDeleted', function () {
                cj.setVisible(false);
            });

            ej.on('jobDeleted', function () {
                ej.setVisible(false);
            });

            ci.on('jobDeleted', function () {
                ci.setVisible(false);
            });

            ei.on('jobDeleted', function () {
                ei.setVisible(false);
            });

            cit.on('jobDeleted', function () {
                cit.setVisible(false);
            });

            eit.on('jobDeleted', function () {
                eit.setVisible(false);
            });

            jlb.on('jobDeleted', function () {
                jlb.setVisible(false);
            });

            ilb.on('jobDeleted', function () {
                ilb.setVisible(false);
            });


            cj.relayEvents(jl, ['invoiceDeleted']);
            ej.relayEvents(jl, ['invoiceDeleted']);
            ci.relayEvents(jl, ['invoiceDeleted']);
            ei.relayEvents(jl, ['invoiceDeleted']);
            cit.relayEvents(jl, ['invoiceDeleted']);
            eit.relayEvents(jl, ['invoiceDeleted']);
            jlb.relayEvents(jl, ['invoiceDeleted']);
            ilb.relayEvents(jl, ['invoiceDeleted']);

            cj.on('invoiceDeleted', function () {
                cj.setVisible(false);
            });

            ej.on('invoiceDeleted', function () {
                ej.setVisible(false);
            });

            ci.on('invoiceDeleted', function () {
                ci.setVisible(false);
            });

            ei.on('invoiceDeleted', function () {
                ei.setVisible(false);
            });

            cit.on('invoiceDeleted', function () {
                cit.setVisible(false);
            });

            eit.on('invoiceDeleted', function () {
                eit.setVisible(false);
            });

            jlb.on('invoiceDeleted', function () {
                jlb.setVisible(false);
            });

            ilb.on('invoiceDeleted', function () {
                ilb.setVisible(false);
            });


            cj.relayEvents(jl, ['itemDeleted']);
            ej.relayEvents(jl, ['itemDeleted']);
            ci.relayEvents(jl, ['itemDeleted']);
            ei.relayEvents(jl, ['itemDeleted']);
            cit.relayEvents(jl, ['itemDeleted']);
            eit.relayEvents(jl, ['itemDeleted']);
            jlb.relayEvents(jl, ['itemDeleted']);
            ilb.relayEvents(jl, ['itemDeleted']);

            cj.on('itemDeleted', function () {
                cj.setVisible(false);
            });

            ej.on('itemDeleted', function () {
                ej.setVisible(false);
            });

            ci.on('itemDeleted', function () {
                ci.setVisible(false);
            });

            ei.on('itemDeleted', function () {
                ei.setVisible(false);
            });

            cit.on('itemDeleted', function () {
                cit.setVisible(false);
            });

            eit.on('itemDeleted', function () {
                eit.setVisible(false);
            });

            jlb.on('itemDeleted', function () {
                jlb.setVisible(false);
            });

            ilb.on('itemDeleted', function () {
                ilb.setVisible(false);
            });

            // if a job ID is passed in, then pull up that job
            if (pageParameters.JobID != null && pageParameters.JobID != '') {
                Ext.ComponentQuery.query('#jobList')[0].fireEvent('jobSelected', pageParameters.JobID);
            }

            att.relayEvents(jl, ['addAttachment']);
            att.relayEvents(nj, ['newJob']);
            att.relayEvents(jl, ['jobSelected']);
            att.relayEvents(jl, ['newInvoice']);
            att.relayEvents(jl, ['editInvoice']);
            att.relayEvents(jl, ['newItem']);
            att.relayEvents(jl, ['editItem']);
            att.relayEvents(jl, ['jobDeleted']);
            att.relayEvents(jl, ['invoiceDeleted']);
            att.relayEvents(jl, ['itemDeleted']);

            att.on('addAttachment', function (jobID) {
                att.setVisible(true);
                assignAttachmentToJob(jobID);
            });

            att.on('cancelAddAttachment', function () {
                att.setVisible(false);
            });

            jlb.relayEvents(att, ['cancelAddAttachment']);
            ilb.relayEvents(att, ['cancelAddAttachment']);

            jlb.on('cancelAddAttachment', function () {
                jlb.setVisible(false);
            });

            ilb.on('cancelAddAttachment', function () {
                ilb.setVisible(false);
            });

            att.on('newJob', function () {
                att.setVisible(false);
            });


            att.on('jobSelected', function () {
                att.setVisible(false);
            });


            att.on('newInvoice', function () {
                att.setVisible(false);
            });


            att.on('editInvoice', function () {
                att.setVisible(false);
            });


            att.on('newItem', function () {
                att.setVisible(false);
            });


            att.on('editItem', function () {
                att.setVisible(false);
            });


            att.on('jobDeleted', function () {
                att.setVisible(false);
            });


            att.on('invoiceDeleted', function () {
                att.setVisible(false);
            });


            att.on('itemDeleted', function () {
                att.setVisible(false);
            });


            cj.relayEvents(jl, ['addAttachment']);
            ej.relayEvents(jl, ['addAttachment']);
            ci.relayEvents(jl, ['addAttachment']);
            ei.relayEvents(jl, ['addAttachment']);
            cit.relayEvents(jl, ['addAttachment']);
            eit.relayEvents(jl, ['addAttachment']);
            jlb.relayEvents(jl, ['addAttachment']);
            ilb.relayEvents(jl, ['addAttachment']);

            cj.on('addAttachment', function () {
                cj.setVisible(false);
            });

            ej.on('addAttachment', function () {
                ej.setVisible(false);
            });

            ci.on('addAttachment', function () {
                ci.setVisible(false);
            });

            ei.on('addAttachment', function () {
                ei.setVisible(false);
            });

            cit.on('addAttachment', function () {
                cit.setVisible(false);
            });

            eit.on('addAttachment', function () {
                eit.setVisible(false);
            });

            jlb.on('addAttachment', function (jobID, jobNumber, installDate) {
                jlb.setVisible(true);
                fillOutJobLabel(jobID, jobNumber, installDate);
            });

            ilb.on('addAttachment', function () {
                ilb.setVisible(false);
            });

            jl.relayEvents(att, ['attachmentUploaded']);

            jl.on('attachmentUploaded', function () {
                refreshJobList();
            });

            jl.on('attachmentDeleted', function () {
                attachmentDeleted();
                refreshJobList();
            });

            jl.on('deleteAttachmentFailed', function () {
                deleteAttachmentFailed();
            });

        });
    </script>
</asp:Content>

<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">

    <div style="float:left;margin-left:10px">
        <div style="float:left">
            <div style="margin-bottom:20px;margin-top:10px;">
                <table width="530px">
                    <tr>
                        <td style="vertical-align:bottom;width:60%">
                            <div id="newJobButton" class="newJobButton" style="float:left"></div>
                            <div id="printJobsButton" class="printJobsButton" style="float:left;margin-left:10px"></div>
                        </td>
                    </tr>
                </table>
            </div>
            <div>
                <div id="jobListPanel"  class="jobList" style="float:left"></div>
            </div>
        </div>
        <div style="float:left;width:400px;margin-left:40px;margin-top:130px">
            <div id="customerLabel" class="customerLabel" style="width:570px;position:relative;top:-120px;"></div>
            <div style="position:relative;top:-90px">    
                <div id="jobLabel" class="jobLabel"></div>
                <div id="invoiceLabel" class="invoiceLabel"></div>
                <div id="createJobForm" class="createJobForm"></div>
                <div id="editJobForm" class="editJobForm"></div>
                <div id="createInvoiceForm" class="createInvoiceForm"></div>
                <div id="editInvoiceForm" class="editInvoiceForm"></div>
                <div id="createItemForm" class="createItemForm"></div>
                <div id="editItemForm" class="editItemForm"></div>
                <div id="addAttachmentForm" class="addAttachmentForm"></div>
            </div>
        </div>
    </div>

</asp:Content>
