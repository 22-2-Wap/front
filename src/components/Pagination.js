import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Page = styled.ul`
    text-align:center;
`
const Pagenum = styled.li`
    color:#2C3333;
    display:inline-block;
    background-color:ba;
    overflow:hidden;
`

const Click = styled.a`
    text-decoration:none;
    width:10px;
    height:10px;
    padding:20px;

    &:focus{
        background-color:yellow;
    }
`
const Pagination = ({postPerPage,totalPosts,paginate})=>{
    const pageNumbers=[];

    for (let i=1; i<Math.ceil(totalPosts/postPerPage)+1;i++){
        pageNumbers.push(i);
    }
    

    return(
        <nav>
            <Page className="pagination">
                {pageNumbers.map(num=>
                    <Pagenum key = {num}>
                        <Click onClick={()=> paginate(num)}>
                            <Link to={`./`}>{num}</Link>
                        </Click>
                    </Pagenum>)}

            </Page>
        </nav>
    );
};

export default Pagination;