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

Ext.define('jobtracker.model.paymenttype', {
    extend: 'Ext.data.Model',
    fields: ['PaymentTypeName', 'PaymentTypeID']
});


Ext.define('jobtracker.store.paymenttypestore', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    model: 'jobtracker.model.paymenttype',
    proxy: {
        type: 'ajax',
        url: 'Dispatchers/XML/GetPaymentTypesHandler.ashx',
        reader: {
            type: 'xml',
            record: 'PaymentType'
        }
    }
});

