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


var defaultPrintRoutingSheetTpl = Ext.create('Ext.XTemplate',
'<div style="width:1200px;text-align:center;overflow:auto;margin-top:20px;margin-bottom:20px;font-size:18px;font-weight:bold">',
    'All Star Plumbing Services, Inc',
'</div>',
'<div style="width:1200px;overflow:auto;margin-top:20px;margin-bottom:20px;font-size:32px;font-weight:bold">',
    'ROUTE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DATE: {[this.getDatePlusOne()]}',
'</div>',
'<tpl for=".">',
    '<div class="printRoutingSheetSelectBox" id="{JobID}">',
        '<div style="clear:left;float:left">',
            '<table border="1">',
                '<tr>',
                    '<td style="width:300px">',
                        '<div style="padding:8px;width:300px"><b>NAME</b></div>',
                    '</td>',
                    '<td style="width:200px">',
                        '<div style="padding:8px;width:200px"><b>ITEM</b></div>',
                    '</td>',
                    '<td style="width:200px">',
                        '<div style="padding:8px;width:200px"><b>INSTALLER</b></div>',
                    '</td>',
                    '<td style="width:100px">',
                        '<div style="padding:8px;width:100px"><b>TIME</b></div>',
                    '</td>',
                    '<td style="width:200px">',
                        '<div style="padding:8px;width:200px"><b>COMMENTS</b></div>',
                    '</td>',
                    '<td style="width:180px">',
                        '<div style="padding:8px;width:180px"><b>CIRCLE ONE</b></div>',
                    '</td>',
                '</tr>',
                '<tr style="vertical-align:top">',
                    '<td style="width:300px">',
                        '<div style="padding:15px;padding-left:8px;overflow:auto;width:300px">',
                            '<div>{[this.formatName(values.FirstName, values.LastName)]}</div>',
                            '<div style="clear:left;float:left">{Company}</div>',
                            '<div style="clear:left;float:left">{Address1}</div>',
                            '<div style="clear:left;float:left">{Address2}</div>',
                            '<div style="clear:left;float:left">{[this.formatCity(values.City, values.State, values.Zip)]}</div>',
                        '</div>',
                    '</td>',
                    '<td style="width:200px">',
                        '<div style="padding:15px;padding-left:8px;width:200px">',
                           '{ItemNo}',
                        '</div>',
                    '</td>',
                    '<td style="width:200px">',
                        '<div style="padding:15px;padding-left:8px;width:200px">',
                           '{Technician}',
                        '</div>',
                    '</td>',
                    '<td style="width:100px">',
                        '<div style="padding:15px;padding-left:8px;width:100px">',
                           '{InstallTimeFrom} - {InstallTimeTo}',
                        '</div>',
                    '</td>',
                    '<td style="width:200px">',
                        '<div style="padding:15px;padding-left:8px;width:200px">',
                           '{Notes}',
                        '</div>',
                    '</td>',
                    '<td>',
                        '<div style="overflow:auto;padding-top:15px;padding-bottom:12px;width:180px">',
                            '<table width="180">',
                                '<tr>',
                                    '<td style="border-bottom:solid black 1px">',
                                        '<div style="text-align:center;padding-bottom:8px;">Complete</div>',
                                    '</td>',
                                '</tr>',
                                '<tr>',
                                    '<td style="border-bottom:solid black 1px">',
                                        '<div style="text-align:center;padding-top:8px;padding-bottom:8px;">CWC</div>',
                                    '</td>',
                                '</tr>',
                                '<tr>',
                                    '<td style="border-bottom:solid black 1px">',
                                        '<div style="text-align:center;padding-top:8px;padding-bottom:8px;">CPC</div>',
                                    '</td>',
                                '</tr>',
                                '<tr>',
                                    '<td style="border-bottom:solid black 1px">',
                                        '<div style="text-align:center;padding-top:8px;padding-bottom:8px;">R/S</div>',
                                    '</td>',
                                '</tr>',
                                '<tr>',
                                    '<td>',
                                        '<div style="width:160px;padding-top:8px;"><div style="float:right">am/pm</div></div>',
                                    '</td>',
                                '</tr>',
                            '</table>',
                        '</div>',
                    '</td>',
                '</tr>',
            '</table>',
        '</div>',
    '</div>',
'</tpl>',
{
    formatName: function (firstName, lastName) {
        if (firstName == '') return lastName;
        return firstName + ' ' + lastName;
    },
    formatCity: function (city, state, zip) {
        if (city == '' && state == '' && zip == '') return '';

        if (city == '' && state == '') return zip;
        if (city == '' && zip == '') return state;
        if (state == '' && zip == '') return city;

        if (city == '') return state + ' ' + zip;
        if (state == '') return city + ', ' + zip;
        if (zip == '') return city + ', ' + state;

        return city + ', ' + state + ' ' + zip;
    },
    formatDate: function (value) {
        return Ext.Date.format(value, 'M j, Y');
    },
    getDatePlusOne: function () {
        var d = new Date();
        d.setDate(d.getDate() + 1); 
        return d.toDateString();
    }
});


Ext.define('jobtracker.view.printroutingsheet', {
    extend: 'Ext.container.Container',
    itemId: 'printRoutingSheet',
    layout: { type: 'hbox' },
    width: 1200,

    initComponent: function () {
        this.items = this.buildItems();
        this.callParent();
    },


    buildItems: function () {
        return [{
                    xtype: 'container',
                    items: [{
                        autoScroll: true,
                        xtype: 'dataview',
                        emptyText: 'There are no jobs to display.',
                        itemId: 'printRoutingSheetDataView',
                        width: 1200,
                        tpl: defaultPrintRoutingSheetTpl,
                        itemSelector: 'div.printRoutingSheetSelectBox',
                        singleSelect: true
                    }]
                }]
        }
});
