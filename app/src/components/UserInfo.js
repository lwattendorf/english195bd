import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { auth } from '../firebase';
import { useSelector } from 'react-redux';

const PROPERTIES = [
    'displayName',
    'email',
    'emailVerified',
    'isAnonymous',
    'phoneNumber',
    'photoURL',
    'uid',
];
export default function UserInfo() {
    const settings = useSelector((state) => state.app.settings);

    const [showLogs, setShowLogs] = React.useState(
        settings && settings.includes('code')
    );

    function createRow(property, value) {
        return { property, value };
    }
    let tableData = [];

    let userData = auth.currentUser;
    for (let i in PROPERTIES) {
        let property = PROPERTIES[i];
        tableData.push(createRow(property, userData[property]));
    }

    React.useEffect(() => {
        setShowLogs(settings && settings.includes('code'));
    }, [settings]);

    return (
        <div>
            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>Property</TableCell>
                            <TableCell>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row) => (
                            <TableRow key={row.property}>
                                <TableCell component="th">
                                    {row.property}
                                </TableCell>
                                <TableCell>
                                    {row.value == null
                                        ? 'null'
                                        : row.value === true
                                        ? 'true'
                                        : row.value === false
                                        ? 'false'
                                        : row.value}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="subtitle2" sx={{paddingTop: '10px'}}>
                {showLogs ? 'data pulled from user profile via google auth': ' '}
            </Typography>
        </div>
    );
}
