import React, { Component } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Form from 'react-bootstrap/Form';
import queryString from 'query-string';

import {
    withRouter
} from 'react-router-dom';
import moment from 'moment';

class EmployeeList extends Component {
    state = {
        sortBy: '',
        columnDefs: [{
            headerName: "Name", field: "name", sortable: true, filter: true
        },
        {
            headerName: "Gender", field: "gender", sortable: true, filter: true
        },
        {
            headerName: "Date of Joining", field: "hireDate", sortable: true, filter: true,
            cellRenderer: (data) => {
                return moment(data.value).format('MM/DD/YYYY');
            }
        },
        {
            headerName: "Age", field: "age", sortable: true, filter: true
        },
        {
            headerName: "Salary", field: "salary", sortable: true, filter: true
        },
        {
            headerName: "Phone Number", field: "phoneNumber", sortable: true, filter: true
        },
        {
            headerName: "Date of Birth", field: "dateOfBirth", sortable: true, filter: true,
            cellRenderer: (data) => {
                return moment(data.value).format('MM/DD/YYYY')
            }
        },

        ],
        rowData: []
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function () {
            setTimeout(function () {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    handleSortByChange =(event)=>{
        
        this.setState({ sortBy:event.target.value })
        this.fetchEmployeeData(event.target.value);
    }
    onSelectionChanged = () => {
        var selectedRows = this.gridApi.getSelectedRows();
        if(this.state.sortBy){        	
        	this.props.history.push(`/employee/${selectedRows[0].id}?sortBy=${this.state.sortBy}`);
        }else{
        	this.props.history.push(`/employee/${selectedRows[0].id}`);
        }
    }

    fetchEmployeeData(sortBy) {
    	if(sortBy){
        fetch(`http://localhost:8080/api/employee?sortBy=${sortBy}`)
            .then(result => result.json())
            .then(rowData => this.setState({ rowData }));
    	}else{
    		 fetch(`http://localhost:8080/api/employee`)
             .then(result => result.json())
             .then(rowData => this.setState({ rowData }));
    	}
    }

    componentDidMount() {
        const {sortBy} = queryString.parse(this.props.location.search)
       if(sortBy){
        this.setState({ sortBy})
        this.fetchEmployeeData(sortBy);
       }else{
    	   this.fetchEmployeeData();
       }


    }
    render() {
     const   {sortBy, columnDefs, rowData} = this.state;
        return (
            <div style={{ padding: '1rem' }} >
                <Form.Group style={{ width: '30%' }}>
                    <Form.Label>SortBy</Form.Label>
                    <Form.Control 
                    as="select"
                    onChange={this.handleSortByChange}
                    value={sortBy}>
                        <option value=''>Select</option>
                        {columnDefs.map((col,index) => { return (<option key = {index} value={col.field}>{col.headerName}</option>) })}
                    </Form.Control>
                </Form.Group>
                { rowData &&
                <>
                <h3>Employee Data</h3>
                <div style={{ height: '19rem', width: '100%' }} className="ag-theme-balham">
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={rowData}
                        onGridReady={this.onGridReady}
                        rowSelection="single"
                        onSelectionChanged={this.onSelectionChanged}
                    >
                    </AgGridReact>

                </div>
                </>
                }
            </div>
        )
    }
}

export default withRouter(EmployeeList)