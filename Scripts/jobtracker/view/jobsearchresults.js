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


var defaultJobSearchResultsTpl = Ext.create('Ext.XTemplate',
'<tpl for=".">',
    '<div class="jobSearchResultsSelectBox" onmouseover="HighlightThis(this);" onmouseout="UnhighlightThis(this);" id="{JobID}">',
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
                                                    '<td width="120px" style="align:left">Job Type:</td>',
                                                    '<td>{JobType}</td>',
                                                '</tr>',
                                            '</table>',
                                        '</div>',
                                    '</td>',
                                '</tr>',

                                '<tr>',
                                    '<td colspan="2">',
                                        '<div style="margin-bottom:5px;">',
                                            '<table>',
                                                '<tr>',
                                                    '<td width="120px" style="align:left">Customer:</td>',
                                                    '<td>{FirstName} {LastName}</td>',
                                                '</tr>',
                                            '</table>',
                                        '</div>',
                                    '</td>',
                                '</tr>',

                                '<tpl if="Phone!=\'\'">',
                                '<tr>',
                                    '<td colspan="2">',
                                        '<div style="margin-bottom:5px;">',
                                            '<table>',
                                                '<tr>',
                                                    '<td width="120px" style="align:left">Phone #:</td>',
                                                    '<td>{Phone}</td>',
                                                '</tr>',
                                            '</table>',
                                        '</div>',
                                    '</td>',
                                '</tr>',
                                '</tpl>',

                                '<tr>',
                                    '<td colspan="2">',
                                        '<div style="margin-bottom:5px;">',
                                            '<table>',
                                                '<tr>',
                                                    '<td width="120px" style="align:left"><b>Job #:</b></td>',
                                                    '<td><span style="color:#2e408c"><b>{JobNo}</b></span></td>',
                                                '</tr>',
                                            '</table>',
                                        '</div>',
                                    '</td>',
                                '</tr>',

                                '<tr>',
                                    '<td colspan="2">',
                                        '<div style="margin-bottom:5px;">',
                                            '<table>',
                                                '<tr>',
                                                    '<td width="120px" style="align:left">Job Status:</td>',
                                                    '<td>{JobStatus}</td>',
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
                                                    '<td width="120px" style="align:left">PO #:</td>',
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
                                                    '<td width="120px" style="align:left">Serial #:</td>',
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
                                    '<td colspan="2">',
                                        '<div style="margin-bottom:5px;">',
                                            '<table>',
                                                '<tr>',
                                                    '<td width="120px" style="align:left">',
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
                                        '<div style="margin-bottom:5px;">',
                                            '<table>',
                                                '<tr>',
                                                    '<td width="120px" style="align:left">',
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

                                '<tpl if="InvoiceNo!=\'\'">',
                                '<tr>',
                                    '<td colspan="2">',
                                        '<div style="margin-bottom:5px;">',                                            
                                            '<table>',
                                                '<tr>',
                                                    '<td width="120px" style="align:left">Invoice #:</td>',
                                                    '<td>{InvoiceNo}</td>',
                                                '</tr>',
                                            '</table>',
                                        '</div>',
                                    '</td>',
                                '</tr>',
                                '</tpl>',

                                '<tpl if="PaymentStatus!=\'\'">',
                                '<tr>',
                                    '<td colspan="2">',
                                        '<div style="margin-bottom:5px;">',
                                            '<table>',
                                                '<tr>',
                                                    '<td width="120px" style="align:left">Payment Status:</td>',
                                                    '<td>{PaymentStatus}</td>',
                                                '</tr>',
                                            '</table>',
                                        '</div>',
                                    '</td>',
                                '</tr>',
                                '</tpl>',

                                '<tpl if="ItemNo!=\'\'">', '<tr>',
                                '<tr>',
                                    '<td colspan="2">',
                                        '<div style="margin-bottom:5px;">',
                                            '<table>',
                                                '<tr>',
                                                    '<td width="120px" style="align:left">Item #:</td>',
                                                    '<td>{ItemNo}</td>',
                                                '</tr>',
                                            '</table>',
                                        '</div>',
                                    '</td>',
                                '</tr>',
                                '</tpl>',
                            '</table>',
                        '</div>',
                    '</td>',
                '</tr>',
            '</table>',
        '</div>',
    '</div>',
'</tpl>',
{
    formatDate: function (value) {
        return Ext.Date.format(value, 'M j, Y');
    }
});


Ext.define('jobtracker.view.jobsearchresults', {
    extend: 'Ext.container.Container',
    itemId: 'jobSearchResults',
    layout: { type: 'hbox' },
    width: 580,
    height: 650,

    initComponent: function () {
        this.items = this.buildItems();
        this.callParent();
    },


    buildItems: function () {
        return [{
            xtype: 'panel',
            title: 'Jobs that match your search',
            width: 580,
            height: 650,
            frame: true,
            autoScroll: true,
            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'container',
                items: [{
                    autoScroll: true,
                    xtype: 'dataview',
                    emptyText: 'There are no jobs to display.',
                    itemId: 'jobSearchResultsDataView',
                    width: 580,
                    tpl: defaultJobSearchResultsTpl,
                    itemSelector: 'div.jobSearchResultsSelectBox',
                    singleSelect: true,
                    listeners: {
                        itemClick: function (view, record, item, index, e, opts) {
                            var selectedNode = item;
                            jobPage('view', record.get('CustomerID'), record.get('FirstName'), record.get('LastName'), record.get('Company'), record.get('Address1'), record.get('Address2'), record.get('City'), record.get('State'), record.get('Zip'), record.get('JobID'));
                        }
                    }
                }]
            }]
        }]
    }
});
