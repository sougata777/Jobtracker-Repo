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

Ext.define('jobtracker.model.interval', {
    extend: 'Ext.data.Model',
    fields: ['IntervalName', 'IntervalID']
});


Ext.define('jobtracker.store.intervalstore', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    model: 'jobtracker.model.interval',
    proxy: {
        type: 'ajax',
        url: 'Dispatchers/XML/GetIntervalsHandler.ashx',
        reader: {
            type: 'xml',
            record: 'Interval'
        }
    }
});