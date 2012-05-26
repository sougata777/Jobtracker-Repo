﻿//
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


var defaultJobListTpl = Ext.create('Ext.XTemplate',
'<tpl for=".">',
    '<div class="jobSelectBox" onmouseover="HighlightThis(this);" onmouseout="UnhighlightThis(this);" id="{JobID}">',
        '<div style="margin-bottom:20px;clear:both;float:left">',
            '<span style="color:#2e408c;font-size:x-small">',
                '[&nbsp;<b><a href="javascript:void(0)" onclick="raiseAddInvoiceEvent(\'{JobID}\', \'{JobNo}\', \'{InstallDate}\');return false;">Add an invoice</a></b>&nbsp;]&nbsp;&nbsp;&nbsp;&nbsp;',
            '</span>',
            '<span style="color:#2e408c;font-size:x-small">',
                '[&nbsp;<b><a href="javascript:void(0)" onclick="raiseEditJobEvent(\'{JobID}\');return false;">Edit this job</a></b>&nbsp;]&nbsp;&nbsp;&nbsp;&nbsp;',
                '[&nbsp;<b><a href="javascript:void(0)" onclick="deleteJob(\'{JobID}\');return false;">Delete this job</a></b>&nbsp;]&nbsp;&nbsp;&nbsp;&nbsp;',
                '[&nbsp;<b><a href="javascript:void(0)" onclick="raiseAddAttachmentEvent(\'{JobID}\', \'{JobNo}\', \'{InstallDate}\');return false;">Attach work order</a></b>&nbsp;]',
            '</span>',
        '</div>',
        '<div style="clear:left;float:left">',
            '<table>',
                '<tr>',
                    '<td style="vertical-align:top">',
                        '<div style="text-align:top;">',
                            '<table border="0">',
                                '<tr>',
                                    '<td colspan="2">',
                                        '<div style="margin-bottom:5px;">',
                                            '<table>',
                                                '<tr>',
                                                    '<td width="80px" style="align:left"><b>Job #:</b></td>',
                                                    '<td><span style="color:#2e408c"><b>{JobNo}</b></span></td>',
                                                '</tr>',
                                            '</table>',
                                        '</div>',
                                    '</td>',
                                '</tr>',
                                '<tr>',
                                    '<td>',
                                        '<div style="margin-bottom:5px;">',
                                            '<table>',
                                                '<tr>',
                                                    '<td width="80px" style="align:left">Status:</td>',
                                                    '<td><span>{JobStatusName}</span></td>',
                                                '</tr>',
                                            '</table>',
                                        '</div>',
                                    '</td>',
                                    '<td>',
                                        '&nbsp;',
                                    '</td>',
                                '</tr>',
                                '<tr>',
                                    '<td>',
                                        '<div style="margin-bottom:5px;">',
                                            '<table>',
                                                '<tr>',
                                                    '<td width="80px" style="align:left">PO #:</td>',
                                                    '<td><span>{PONo}</span></td>',
                                                '</tr>',
                                            '</table>',
                                        '</div>',
                                    '</td>',
                                    '<td>',
                                        '&nbsp;',
                                    '</td>',
                                '</tr>',
                                '<tr>',
                                    '<td>',
                                        '<div style="margin-bottom:5px;">',
                                            '<table>',
                                                '<tr>',
                                                    '<td width="80px" style="align:left">Dispatch #:</td>',
                                                    '<td><span>{DispatchNo}</span></td>',
                                                '</tr>',
                                            '</table>',
                                        '</div>',
                                    '</td>',
                                    '<td>',
                                        '&nbsp;',
                                    '</td>',
                                '</tr>',
                                '<tr>',
                                    '<td>',
                                        '<div style="margin-bottom:5px;">',
                                                '<table>',
                                                '<tr>',
                                                    '<td width="80px" style="align:left">Serial #:</td>',
                                                    '<td><span>{SerialNo}</span></td>',
                                                '</tr>',
                                            '</table>',
                                        '</div>',
                                    '</td>',
                                    '<td>',
                                        '&nbsp;',
                                    '</td>',
                                '</tr>',
                                '<tr>',
                                    '<td>',
                                        '<div style="margin-bottom:5px;">',
                                            '<table>',
                                                '<tr>',
                                                    '<td width="80px" style="align:left">Project #:</td>',
                                                    '<td><span>{ProjectNo}</span></td>',
                                                '</tr>',
                                            '</table>',
                                        '</div>',
                                    '</td>',
                                    '<td>',
                                        '&nbsp;',
                                    '</td>',
                                '</tr>',
                                '<tr>',
                                    '<td colspan="2">',
                                        '<div style="margin-bottom:5px;">',
                                            '<table>',
                                                '<tr>',
                                                    '<td width="80px" style="align:left">',
                                                        'Install Date:',
                                                    '</td>',
                                                    '<td>', 
                                                        '{InstallDate}',
                                                    '</td>',
                                                '</tr>',
                                            '</table>',
                                        '</div>',
                                    '</td>',
                                '</tr>',
                                '<tr>',
                                    '<td colspan="2">',
                                        '<div>',
                                            '<table>',
                                                '<tr>',
                                                    '<td width="80px" style="align:left">',
                                                        'Install Time:',
                                                    '</td>',
                                                    '<td>',
                                                        '{InstallTimeFrom} - {InstallTimeTo}',
                                                    '</td>',
                                                '</tr>',
                                            '</table>',
                                        '</div>',
                                    '</td>',
                                '</tr>',
                            '</table>',
                        '</div>',
                    '</td>',
                    '<td>',
                        '<div style="margin-left:30px">',
                            '<table>',
                                '<tr>',
                                    '<td width="80px" style="align:left;vertical-align:top">Technicians:</td>',
                                    '<td><div style="border: solid #cccccc 1px;width:150px;height:80px;overflow:auto;padding:2px">{Technician}</div></td>',
                                '</tr>',
                                '<tr>',
                                    '<td width="80px" style="align:left;vertical-align:top"><div style="margin-top:10px">Notes:</div></td>',
                                    '<td><div style="border: solid #cccccc 1px;width:150px;height:80px;overflow:auto;margin-top:10px;padding:2px">{Notes}</div></td>',
                                '</tr>',
                            '</table>',
                        '</div>',
                    '</td>',
                '</tr>',
            '</table>',
        '</div>',

        '<div style="height:15px;clear:left;float:left"></div>',

        '<div style="clear:left;float:left;margin-bottom:5px;margin-top:5px">',
            '<tpl for="attachments">',
                '<div style="margin-bottom:2px">',
                    '<table>',
                        '<tr>',
                            '<td style="vertical-align:middle">',
                                '<span style="color:#2e408c;font-size:x-small">',
                                    '<img src="Images/clip_16.png" alt="" />',
                                '</span>',
                            '</td>',
                            '<td style="vertical-align:top">',
                                '<span style="color:#2e408c;font-size:x-small">',
                                    '<b>&nbsp;&nbsp;<a target="_blank" href="ShowAttachment.aspx?JobID={parent.JobID}">{AttachmentName}</a>&nbsp;&nbsp;&nbsp;[&nbsp;<a href="javascript:void(0)" onclick="deleteAttachment(\'{parent.JobID}\');return false;">Delete</a>&nbsp;]</b>',
                                '</span>',
                            '</td>',
                        '</tr>',
                    '</table>',
                '</div>',
            '</tpl>',
        '</div>',

        '<div style="height:15px;clear:left;float:left"></div>',

        '<div style="clear:left;float:left">',
            '<p style="font-size:14px;margin-left:5px"><b>Invoices</b></p>',
            '<div style="height:2px"></div>',
            '<tpl if="invoices.length == 0"><div style="margin-left:5px">There are no invoices for this job.</div></tpl>',
            '<tpl for="invoices">',
                '<tpl exec="values.parent = parent;"></tpl>',
                '<div style="margin-bottom:35px;margin-top:10px">',
                    '<div style="margin-left:5px;margin-bottom:10px">',
                        '<span style="color:#2e408c;font-size:x-small">',
                            '[&nbsp;<b><a href="javascript:void(0)" onclick="raiseAddItemEvent(\'{InvoiceID}\', \'{parent.JobID}\', \'{parent.JobNo}\', \'{parent.InstallDate}\', \'{InvoiceNo}\');return false;">Add an item</a></b>&nbsp;]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
                        '</span>',
                        '<span style="color:#2e408c;font-size:x-small">',
                            '[&nbsp;<b><a href="javascript:void(0)" onclick="raiseEditInvoiceEvent(\'{InvoiceID}\', \'{InvoiceNo}\', \'{PaymentStatusID}\', \'{PaymentTypeID}\', \'{parent.JobID}\', \'{parent.JobNo}\', \'{parent.InstallDate}\');return false;">Edit this invoice</a></b>&nbsp;]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
                        '</span>',
                        '<span style="color:#2e408c;font-size:x-small">',
                            '[&nbsp;<b><a href="javascript:void(0)" onclick="deleteInvoice(\'{InvoiceID}\');return false;">Delete this invoice</a></b>&nbsp;]',
                        '</span>',
                    '</div>',
                    '<div style="margin-left:5px"><b>Invoice #: <span style="color:#2e408c">{InvoiceNo}</span></b></div>',
                    '<div style="margin-left:5px">Status: {PaymentStatusName}</div>',
                    '<div style="margin-left:5px">Type: {PaymentTypeName}',
                    '</div>',
                    '<tpl for="items">',
                        '<div style="margin-left:5px">',
                            '<div style="height:5px"></div>',
                            '<div><b>Item #: <span style="color:#000000">{ItemNo}</b></span>',
                                '<span style="color:#2e408c;font-size:x-small">',
                                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&nbsp;<b><a href="javascript:void(0)" onclick="raiseEditItemEvent(\'{ItemID}\', \'{ItemNo}\', \'{SKU}\', \'{Description}\', \'{Quantity}\', \'{Amount}\', \'{parent.parent.JobID}\', \'{parent.parent.JobNo}\', \'{parent.parent.InstallDate}\', \'{parent.InvoiceNo}\');return false;">Edit</a></b>&nbsp;]',
                                '</span>',
                                '<span style="color:#2e408c;font-size:x-small">',
                                    '&nbsp;&nbsp;&nbsp;[&nbsp;<b><a href="javascript:void(0)" onclick="deleteItem(\'{ItemID}\');return false;">Delete</a></b>&nbsp;]',
                                '</span>',
                            '</div>',
                            '<div>SKU: {SKU}</div>',
                            '<div>',
                                '<table>',
                                    '<tr>',
                                        '<td>',
                                            '<div style="margin-top:4px">Description</div>',
                                            '<div style="border: solid #cccccc 1px;width:150px;height:30px;overflow:auto;padding:2px">{Description}</div>',
                                        '</td>',
                                        '<td>',
                                            '<div style="margin-left:15px">Qty: {Quantity}</div>',
                                        '</td>',
                                        '<td>',
                                            '<div style="margin-left:15px">Amount: ${Amount}</div>',
                                        '</td>',
                                    '</tr>',
                                '</table>',
                            '</div>',
                        '</div>',
                    '</tpl>',
                '</div>',
            '</tpl>',
        '</div>',
    '</div>',
'</tpl>',
{
    formatDate: function (value) {
        return Ext.Date.format(value, 'M j, Y');
    }
});


Ext.define('jobtracker.view.joblist', {
    extend: 'Ext.container.Container',
    itemId: 'jobList',
    layout: { type: 'hbox' },
    width: 500,
    height: 650,

    initComponent: function () {
        this.items = this.buildItems();
        this.callParent();
    },


    buildItems: function () {
        return [{
            xtype: 'panel',
            title: 'Current Jobs',
            frame: true,
            width: 500,
            height: 650,
            autoScroll: true,
            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'container',
                items: [{
                    autoScroll: true,
                    viewConfig: {
                        preserveScrollOnRefresh: true
                    },
                    xtype: 'dataview',
                    emptyText: 'There are no jobs to display.',
                    itemId: 'jobListDataView',
                    width: 480,
                    tpl: defaultJobListTpl,
                    itemSelector: 'div.jobSelectBox',
                    singleSelect: true,
                    listeners: {
                        itemClick: function (view, record, item, index, e, opts) {
                            var selectedNode = item;
                            //Ext.ComponentQuery.query('#jobList')[0].fireEvent('jobSelected', selectedNode.id);
                        }
                    }
                }]
            }]
        }]
    }
});
