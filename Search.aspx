<%@ Page Title="Search Jobs" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeBehind="Search.aspx.cs" Inherits="JobTracker.Search" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">

    <script type="text/javascript" src="Scripts/jobtracker/model/job.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/model/jobstatus.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/model/jobtype.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/model/paymentstatus.js"></script>

    <script type="text/javascript" src="Scripts/jobtracker/view/jobsearchform.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/view/jobsearchresults.js"></script>

    <script type="text/javascript" src="Scripts/jobtracker/controller/searchcontroller.js"></script>

    <style type="text/css">
        a:link {color:#2e408c;}   
        a:visited {color:#2e408c;}
        a:hover {color:#2e408c;}
        a:active {color:#2e408c;}
        
        .searchButtonIcon {
            background-image: url(Images/zoom_16.png) !important;
        }        
    </style>
    
    <script type="text/javascript">

        Ext.require(['Ext.data.*']);

        Ext.onReady(function () {
            var js = jobSearchForm();
            var jsr = jobSearchResults();

            // hook up event handlers
            js.on('searchJob', function (searchType, searchParameter) {
                searchJobs(searchType, searchParameter);
            });
        });

    </script>
</asp:Content>

<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">

    <div style="margin:50px;margin-top:10px;margin-left:40px;float:left;">
        <div id="jobSearchForm" class="jobSearchForm"></div>
    </div>

    <div style="margin:50px;margin-top:10px;margin-left:10px;float:left;">
        <div id="jobSearchResults"  class="jobSearchResults"></div>
    </div>

</asp:Content>
