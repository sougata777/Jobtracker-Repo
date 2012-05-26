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


function listJobs(pageParameters) {

    var invoiceReader = new Ext.data.XmlReader({
        record: 'Invoice',
        fields: ['InvoiceID', 'InvoiceNo', 'PaymentTypeName', 'PaymentStatusName']
    });

    var attachmentReader = new Ext.data.XmlReader({
        record: 'Attachment',
        fields: ['HasAttachment', 'AttachmentName']
    });

    var itemReader = new Ext.data.XmlReader({
        record: 'Item',
        fields: ['ItemID', 'ItemNo', 'SKU', 'Description', 'Quantity', 'Amount', 'InvoiceID']
    });

    var jobList = Ext.create('jobtracker.view.joblist', {
        renderTo: 'jobListPanel'
    });

    var jobStore = Ext.create('jobtracker.store.jobstore', {
        autoLoad: false,
        reader: {
            type: 'xml',
            record: 'Job',
            fields: [
                'JobID',
                'JobNo',
                'CustomerID',
                'SerialNo',
                'ProjectNo',
                'PONo',
                'ServiceOrderNo',
                'DispatchNo',
                'JobStatusID',
                'SalesCheckNo',
                'Technician',
                'Notes',
                'InstallDate',
                'InstallTimeFrom',
                'InstallTimeTo',
                {
                    name: 'invoices',
                    convert: function (v, n) {
                        return invoiceReader.readRecords(n).records;
                    }
                },
                {
                    name: 'items',
                    convert: function (v, n) {
                        return itemReader.readRecords(n).records;
                    }
                },
                {
                    name: 'attachments',
                    convert: function (v, n) {
                        return attachmentReader.readRecords(n).records;
                    }
                },
            ]
        }
    });

    jobStore.proxy.extraParams.CustomerID = pageParameters.CustomerID;

    // store's load is asynchronous
    jobStore.on("load", function (store, records, options) {

        var jobListDataView = Ext.ComponentQuery.query('#jobListDataView')[0];
        jobListDataView.itemSelector = 'div.jobSelectBox';
        jobListDataView.bindStore(jobStore);

        //jobStore.each(function (record) {
        //    alert(record.get('JobNo'));
        //    record.invoices().each(function (invoice) {
        //        alert(invoice.get('InvoiceID'));
        //        alert(invoice.get('InvoiceNo'));
        //    });
        //});
    });

    jobStore.load();

    return jobList;
}


function createCustomerLabel(pageParameters) {

    Ext.define('jobtracker.model.customerlabel', {
        extend: 'Ext.data.Model',
        fields: [
            { name: 'customerID', type: 'string' },
            { name: 'firstName', type: 'string' },
            { name: 'lastName', type: 'string' },
            { name: 'company', type: 'string' },
            { name: 'address1', type: 'string' },
            { name: 'address2', type: 'string' },
            { name: 'city', type: 'string' },
            { name: 'state', type: 'string' },
            { name: 'zip', type: 'string' }
        ]
    });

    var customerLabelStore = Ext.create('Ext.data.Store', {
        model: 'jobtracker.model.customerlabel',
        autoLoad: true,
        data: [
            {
                customerID: pageParameters.CustomerID,
                firstName: pageParameters.FirstName,
                lastName: pageParameters.LastName,
                company: pageParameters.Company,
                address1: pageParameters.Address1,
                address2: pageParameters.Address2,
                city: pageParameters.City,
                state: pageParameters.State,
                zip: pageParameters.Zip
            }
        ]
    });

    var clb = Ext.create('jobtracker.view.customerlabel', {
        renderTo: 'customerLabel'
    });

    var customerLabelDataView = Ext.ComponentQuery.query('#customerLabelDataView')[0];
    customerLabelDataView.bindStore(customerLabelStore);
}


function newJobButton() {
    var nj = Ext.create('Ext.Button', {
        text: 'Add a New Job',
        scale: 'large',
        iconCls: 'newJobIcon',
        renderTo: 'newJobButton',
        handler: function () {
            this.fireEvent('newJob');
        }
    });

    return nj;
}


function createJobForm(pageParameters) {
    var cj = Ext.create('jobtracker.view.createjobform', {
        renderTo: 'createJobForm',
        hidden: true
    });

    Ext.ComponentQuery.query('#hCustomerID')[0].setValue(pageParameters.CustomerID);

    var jobStatus = Ext.ComponentQuery.query('#jobStatus')[0];
    loadJobStatus(jobStatus);

    var installFrom = Ext.ComponentQuery.query('#installFrom')[0];
    loadInstall(installFrom);

    var installTo = Ext.ComponentQuery.query('#installTo')[0];
    loadInstall(installTo);
    
    return cj;
}


function loadJobStatus(js) {
    var jobStatusStore = Ext.create('jobtracker.store.jobstatusstore', {
        autoLoad: false
    });

    // store's load is asynchronous
    jobStatusStore.on("load", function (store, records, options) {
        js.bindStore(jobStatusStore);
    });

    jobStatusStore.load();
}


function loadInstall(it) {
    var intervalStore = Ext.create('jobtracker.store.intervalstore', {
        autoLoad: false
    });

    // store's load is asynchronous
    intervalStore.on("load", function (store, records, options) {
        it.bindStore(intervalStore);
    });

    intervalStore.load();
}


function loadJobStatus(js) {
    var jobStatusStore = Ext.create('jobtracker.store.jobstatusstore', {
        autoLoad: false
    });

    // store's load is asynchronous
    jobStatusStore.on("load", function (store, records, options) {
        js.bindStore(jobStatusStore);
    });

    jobStatusStore.load();
}


function editJobForm() {
    var ef = Ext.create('jobtracker.view.editjobform', {
        renderTo: 'editJobForm',
        hidden: true
    });

    var jobStatus = Ext.ComponentQuery.query('#ejobStatus')[0];
    loadJobStatus(jobStatus);

    var installFrom = Ext.ComponentQuery.query('#einstallFrom')[0];
    loadInstall(installFrom);

    var installTo = Ext.ComponentQuery.query('#einstallTo')[0];
    loadInstall(installTo);

    return ef;
}


function createJob(customerIDParam, jobNumberParam, PONumberParam, dispatchNumberParam, serviceOrderNumberParam, serialNumberParam, salesCheckNumberParam, projectNumberParam, installDateParam, jobStatusIDParam, technicianParam, notesParam, installFromParam, installToParam) {

    var mask = new Ext.LoadMask(Ext.ComponentQuery.query('#createJobForm')[0], { msg: "Please wait..." });

    jQuery.ajax({
        url: 'Dispatchers/XML/CreateJobHandler.ashx',
        type: 'POST',
        data: {
            CustomerID: customerIDParam,
            JobNumber: jobNumberParam,
            PONumber: PONumberParam,
            DispatchNumber: dispatchNumberParam,
            ServiceOrderNumber: serviceOrderNumberParam,
            SerialNumber: serialNumberParam,
            SalesCheckNumber: salesCheckNumberParam,
            ProjectNumber: projectNumberParam,
            InstallDate: installDateParam,
            JobStatusID: jobStatusIDParam,
            Technician: technicianParam,
            Note: notesParam,
            InstallFrom: installFromParam,
            InstallTo: installToParam
        },
        beforeSend: function () {
            mask.show();
        },
        success: function (response) {
            if (response == 'error') {
                Ext.ComponentQuery.query('#createJobForm')[0].fireEvent('createJobFailed');
            }
            else {
                Ext.ComponentQuery.query('#createJobForm')[0].fireEvent('jobCreated', response);
            }
        },
        failure: function (response) {
            Ext.ComponentQuery.query('#createJobForm')[0].fireEvent('createJobFailed');
        },
        complete: function () {
            mask.hide();
        }
    });
}


function jobCreated() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Job created.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.INFO
    });
}

function createJobFailed() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Could not create job.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.ERROR
    });
}


function refreshJobList(jobID) {
    var jobStore = Ext.create('jobtracker.store.jobstore', {
        autoLoad: false
    });

    // store's load is asynchronous
    jobStore.on("load", function (store, records, options) {

        var jobListDataView = Ext.ComponentQuery.query('#jobListDataView')[0];
        jobListDataView.itemSelector = 'div.jobSelectBox';
        jobListDataView.bindStore(jobStore);

        if (jobID != null) selectJob(jobID);
    });

    jobStore.load();
}


function editJobFailed() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Could not get job details.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.ERROR
    });
}

function editJob(jobIDParam) {
    // get job details
     jQuery.ajax({
         url: 'Dispatchers/XML/EditJobHandler.ashx',
         type: 'POST',
         data: {
             JobID: jobIDParam
         },
         success: function (response) {
             if (response == 'error') {
                 Ext.ComponentQuery.query('#editJobForm')[0].fireEvent('editJobFailed');
             }
             else {
                 var jobDetails = jQuery.xml2json(response);
                 //alert(JSON.stringify(jobDetails));
                 Ext.ComponentQuery.query('#ehJobID')[0].setValue(jobDetails.Job.JobID);
                 Ext.ComponentQuery.query('#ejobNumber')[0].setValue(jobDetails.Job.JobNo);
                 Ext.ComponentQuery.query('#ejobStatus')[0].setValue(jobDetails.Job.JobStatusID);
                 Ext.ComponentQuery.query('#epoNumber')[0].setValue(jobDetails.Job.PONo);
                 Ext.ComponentQuery.query('#edispatchNumber')[0].setValue(jobDetails.Job.DispatchNo);
                 Ext.ComponentQuery.query('#eserviceOrderNumber')[0].setValue(jobDetails.Job.ServiceOrderNo);
                 Ext.ComponentQuery.query('#eserialNumber')[0].setValue(jobDetails.Job.SerialNo);
                 Ext.ComponentQuery.query('#esalesCheckNumber')[0].setValue(jobDetails.Job.SalesCheckNo);
                 Ext.ComponentQuery.query('#eprojectNumber')[0].setValue(jobDetails.Job.ProjectNo);
                 Ext.ComponentQuery.query('#einstallDate')[0].setValue(jobDetails.Job.InstallDate);
                 Ext.ComponentQuery.query('#etechnicians')[0].setValue(jobDetails.Job.Technician);
                 Ext.ComponentQuery.query('#enotes')[0].setValue(jobDetails.Job.Notes);
                 Ext.ComponentQuery.query('#einstallFrom')[0].setValue(jobDetails.Job.InstallFrom);
                 Ext.ComponentQuery.query('#einstallTo')[0].setValue(jobDetails.Job.InstallTo);
             }
         },
         failure: function (response) {
             Ext.ComponentQuery.query('#editJobForm')[0].fireEvent('editJobFailed');
         }
     });
}


function updateJob(jobIDParam, jobNumberParam, PONumberParam, dispatchNumberParam, serviceOrderNumberParam, serialNumberParam, salesCheckNumberParam, projectNumberParam, installDateParam, jobStatusIDParam, technicianParam, notesParam, installFromParam, installToParam) {

    var mask = new Ext.LoadMask(Ext.ComponentQuery.query('#editJobForm')[0], { msg: "Please wait..." });

    jQuery.ajax({
        url: 'Dispatchers/XML/UpdateJobHandler.ashx',
        type: 'POST',
        data: {
            JobID: jobIDParam,
            JobNumber: jobNumberParam,
            PONumber: PONumberParam,
            DispatchNumber: dispatchNumberParam,
            ServiceOrderNumber: serviceOrderNumberParam,
            SerialNumber: serialNumberParam,
            SalesCheckNumber: salesCheckNumberParam,
            ProjectNumber: projectNumberParam,
            InstallDate: installDateParam,
            JobStatusID: jobStatusIDParam,
            Technician: technicianParam,
            Note: notesParam,
            InstallFrom: installFromParam,
            InstallTo: installToParam
        },
        beforeSend: function () {
            mask.show();
        },
        success: function (response) {
            if (response == 'error') {
                Ext.ComponentQuery.query('#editJobForm')[0].fireEvent('updateJobFailed');
            }
            else {
                Ext.ComponentQuery.query('#editJobForm')[0].fireEvent('jobUpdated');
            }
        },
        failure: function (response) {
            Ext.ComponentQuery.query('#editJobForm')[0].fireEvent('updateJobFailed');
        },
        complete: function () {
            mask.hide();
        }
    });
}


function jobUpdated() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Job updated.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.INFO
    });
}

function updateJobFailed() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Could not update job.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.ERROR
    });
}

function deleteJob(jobID) {
    Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete this job?', function (btn) {
        if (btn == 'yes') reallyDeleteJob(jobID);
    });
}

function reallyDeleteJob(jobIDParam) {
    jQuery.ajax({
        url: 'Dispatchers/XML/DeleteJobHandler.ashx',
        type: 'POST',
        data: {
            JobID: jobIDParam
        },
        success: function (response) {
            if (response == 'error') {
                Ext.ComponentQuery.query('#jobList')[0].fireEvent('deleteJobFailed');
            }
            else {
                Ext.ComponentQuery.query('#jobList')[0].fireEvent('jobDeleted');
            }
        },
        failure: function (response) {
            Ext.ComponentQuery.query('#jobList')[0].fireEvent('deleteJobFailed');
        }
    });
}


function jobDeleted() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Job deleted.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.INFO
    });
}

function deleteJobFailed() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Could not delete job.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.ERROR
    });
}


function chooseCustomer() {
    alert("Not Implemented");
}


function raiseEditJobEvent(jobID) {
    Ext.ComponentQuery.query('#jobList')[0].fireEvent('jobSelected', jobID);
}


function raiseAddInvoiceEvent(jobID, jobNumber, installDate) {
    Ext.ComponentQuery.query('#jobList')[0].fireEvent('newInvoice', jobID, jobNumber, installDate);
}

function raiseEditInvoiceEvent(invoiceID, invoiceNumber, paymentStatusID, paymentTypeID, jobID, jobNumber, installDate) {
    Ext.ComponentQuery.query('#jobList')[0].fireEvent('editInvoice', invoiceID, invoiceNumber, paymentStatusID, paymentTypeID, jobID, jobNumber, installDate);
}

function raiseAddItemEvent(invoiceID, jobID, jobNumber, installDate, invoiceNumber) {
    Ext.ComponentQuery.query('#jobList')[0].fireEvent('newItem', invoiceID, jobID, jobNumber, installDate, invoiceNumber);
}

function raiseEditItemEvent(itemID, itemNumber, sku, description, qty, amount, jobID, jobNumber, installDate, invoiceNumber) {
    Ext.ComponentQuery.query('#jobList')[0].fireEvent('editItem', itemID, itemNumber, sku, description, qty, amount, jobID, jobNumber, installDate, invoiceNumber);
}

function raiseAddAttachmentEvent(jobID, jobNumber, installDate) {
    Ext.ComponentQuery.query('#jobList')[0].fireEvent('addAttachment', jobID, jobNumber, installDate);
}


function addAttachmentForm() {
    var att = Ext.create('Ext.form.Panel', {
        title: 'Attach a Work Order',
        itemId: 'addAttachmentForm',
        width: 400,
        bodyPadding: 10,
        frame: true,
        hidden: true,
        renderTo: 'addAttachmentForm',
        items: [
            {
                xtype: 'hidden',
                name: 'AttachmentJobID',
                itemId: 'AttachmentJobID',
                value: ''
            },

            {
                xtype: 'textfield',
                name: 'AttachmentName',
                fieldLabel: 'Name (Required)',
                labelWidth: 100,
                width: 305,
                enforceMaxLength: true,
                maxLength: 20,
                allowBlank: false,
                blankText: 'An attachment name is required'
            },

            {
                xtype: 'filefield',
                name: 'workOrder',
                fieldLabel: 'Work Order',
                labelWidth: 100,
                msgTarget: 'side',
                allowBlank: false,
                anchor: '100%',
                blankText: 'A file is required',
                buttonText: 'Browse...'
            }
        ],

        buttons: [
            {
                text: 'Upload',
                iconCls: 'uploadButtonIcon',
                handler: function () {
                    var form = this.up('form').getForm();
                    if (form.isValid()) {
                        form.submit({
                            url: 'Dispatchers/XML/SaveAttachmentHandler.ashx',
                            waitMsg: 'Uploading your work order...',
                            success: function (fp, o) {
                                Ext.Msg.alert('Success', 'Your work order has been uploaded.');
                                Ext.ComponentQuery.query('#addAttachmentForm')[0].fireEvent('attachmentUploaded');
                            }
                        });
                    }
                }
            },

            {
                text: 'Cancel',
                iconCls: 'cancelButtonIcon',
                handler: function () {
                    Ext.ComponentQuery.query('#addAttachmentForm')[0].fireEvent('cancelAddAttachment');
                }
            }
        ]
    });

    //Ext.ComponentQuery.query('#hattJobID')[0].setValue(pageParameters.JobID);

    return att;
}


function assignAttachmentToJob(jobID) {
    Ext.ComponentQuery.query('#AttachmentJobID')[0].setValue(jobID);
}


function deleteAttachment(jobID) {

    Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete this attachment?', function (btn) {
        if (btn == 'yes') reallyDeleteAttachment(jobID);
    });
}

function reallyDeleteAttachment(jobIDParam) {
    jQuery.ajax({
        url: 'Dispatchers/XML/DeleteAttachmentHandler.ashx',
        type: 'POST',
        data: {
            AttachmentJobID: jobIDParam
        },
        success: function (response) {
            if (response == 'error') {
                Ext.ComponentQuery.query('#jobList')[0].fireEvent('deleteAttachmentFailed');
            }
            else {
                Ext.ComponentQuery.query('#jobList')[0].fireEvent('attachmentDeleted');
            }
        },
        failure: function (response) {
            Ext.ComponentQuery.query('#jobList')[0].fireEvent('deleteAttachmentFailed');
        }
    });
}


function attachmentDeleted() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Attachment deleted.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.INFO
    });
}

function deleteAttachmentFailed() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Could not delete attachment.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.ERROR
    });
}


function clearJobForm() {
    Ext.ComponentQuery.query('#jobNumber')[0].setValue('');
    Ext.ComponentQuery.query('#jobNumber')[0].clearInvalid();
    Ext.ComponentQuery.query('#PONumber')[0].setValue('');
    Ext.ComponentQuery.query('#dispatchNumber')[0].setValue('');
    Ext.ComponentQuery.query('#serviceOrderNumber')[0].setValue('');
    Ext.ComponentQuery.query('#serialNumber')[0].setValue('');
    Ext.ComponentQuery.query('#salesCheckNumber')[0].setValue('');
    Ext.ComponentQuery.query('#projectNumber')[0].setValue('');
    Ext.ComponentQuery.query('#installDate')[0].setValue(new Date());
    Ext.ComponentQuery.query('#jobStatus')[0].setValue(''); ;
    Ext.ComponentQuery.query('#technician')[0].setValue('');
    Ext.ComponentQuery.query('#notes')[0].setValue('');
    Ext.ComponentQuery.query('#installFrom')[0].setValue(''); ;
    Ext.ComponentQuery.query('#installTo')[0].setValue(''); ;
}


function clearInvoiceForm() {
    Ext.ComponentQuery.query('#hJobID')[0].setValue('');
    Ext.ComponentQuery.query('#invoiceNumber')[0].setValue('');
    Ext.ComponentQuery.query('#invoiceNumber')[0].clearInvalid();
    Ext.ComponentQuery.query('#paymentStatus')[0].setValue('');
    Ext.ComponentQuery.query('#paymentType')[0].setValue('');
}


function clearItemForm() {
    Ext.ComponentQuery.query('#hiInvoiceID')[0].setValue('');
    Ext.ComponentQuery.query('#itemNumber')[0].setValue('');
    Ext.ComponentQuery.query('#itemNumber')[0].clearInvalid();
    Ext.ComponentQuery.query('#sku')[0].setValue('');
    Ext.ComponentQuery.query('#description')[0].setValue('');
    Ext.ComponentQuery.query('#qty')[0].setValue('');
    Ext.ComponentQuery.query('#amount')[0].setValue('');
}


function selectJob(jobID) {
    var jobListDataView = Ext.ComponentQuery.query('#jobListDataView')[0];
    var n = jobListDataView.getNode(jobID.toUpperCase());
    n.scrollIntoView(jobListDataView);
}