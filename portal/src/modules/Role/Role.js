import React, {Component} from 'react';
import {Button, Table, Tag} from "antd";
import {Link} from "react-router-dom";
import {getRoles} from "../../actions/role/roleActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router";


class Role extends Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                sorter: true,
            },
            {
                title: 'Name',
                dataIndex: 'name',
                sorter: true,
            },
            {
                title: 'Permissions',
                dataIndex: 'permissions',
                render: permissions =>
                    <>
                        {permissions.map((permission, item) => (
                            <Tag className="mb-1" color="blue" key={permission.id}>
                                {permission.name}
                            </Tag>
                        ))}
                    </>,
                maxWidth: '40%'

            },
            {
                title: 'Action',
                dataIndex: '',
                key: 'x',
                render: (e) => <Link className="ant-dropdown-link" onClick={() => console.log(123)}>Edit</Link>
            },
        ]

        this.handleTableChange = this.handleTableChange.bind(this)
    }

    componentDidMount() {
        let {searchQuery} = this.props.roles
        this.props.getRoles(searchQuery);
    }


    handleTableChange(pagination, filters, sorter) {
        console.log('Filter')
    }

    render() {
        const {data, searchParams} = this.props.roles
        return (
            <>
                <Button className="mb-4" type="primary">Create Role</Button>
                <Table
                    columns={this.columns}
                    rowKey={record => record.id}
                    dataSource={data}
                    pagination={searchParams}
                    loading={false}
                    onChange={this.handleTableChange}
                />
            </>
        );
    }
}

Role.propTypes = {
    getRoles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    roles: state.roles
})

export default withRouter(connect(mapStateToProps,{getRoles})(Role));