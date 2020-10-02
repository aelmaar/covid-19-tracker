import React from 'react'
import {Table as TableChild,TableContainer,TableBody,TableCell,TableHead,TableRow} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';

const StyledTableCell = withStyles((theme) => ({
    head:{
        color:theme.palette.common.white,
        fontWeight:'bold'
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const casesTypeColor = {
    cases:"#CC1034",
    recovered:"#7dd71d",
    deaths:"#fb4443",
}

function Table({casesType,countries,suggestion}) {
    const checkSuggestions = suggestion.length > 0? suggestion:countries
    return (
        <div>
            <TableContainer className='resize'>
                <TableChild>
                    <TableHead style={{backgroundColor:casesTypeColor[casesType]}}>
                        <TableRow>
                            <StyledTableCell align='left'>Country</StyledTableCell>
                            <StyledTableCell align='left'>Tests</StyledTableCell>
                            <StyledTableCell align='left'>Active</StyledTableCell>
                            <StyledTableCell align='left'>Critical</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {checkSuggestions.map(country => (
                            <StyledTableRow>
                                <StyledTableCell align='left'>{country.country}</StyledTableCell>
                                <StyledTableCell align='left'>{country.tests}</StyledTableCell>
                                <StyledTableCell align='left'>{country.active}</StyledTableCell>
                                <StyledTableCell align='left'>{country.critical}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </TableChild>
            </TableContainer>
        </div>
    )
}

export default Table
