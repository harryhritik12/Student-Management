import * as React from 'react';
import { useTable } from 'react-table';


export const TimetableComponent = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Time',
        accessor: 'time',
      },
      {
        Header: 'Monday',
        accessor: 'Monday',
      },
      {
        Header: 'Tuesday',
        accessor: 'Tuesday',
      },
      {
        Header: 'Wednesday',
        accessor: 'Wednesday',
      },
      {
        Header: 'Thursday',
        accessor: 'Thursday',
      },
      {
        Header: 'Friday',
        accessor: 'Friday',
      },
    ],
    []
  );

  const timetableData = React.useMemo(() => {
    // Define time slots from 9 AM to 5 PM
    const timeSlots = [
      '9:00-10:00',
      '10:00-11:00',
      '11:00-12:00',
      '12:00-1:00',
      '1:00-2:00',
      '2:00-3:00',
      '3:00-4:00',
      '4:00-5:00',
    ];

    // Initialize timetable data with empty cells
    const timetable = timeSlots.map((time) => ({
      time,
      Monday: '',
      Tuesday: '',
      Wednesday: '',
      Thursday: '',
      Friday: '',
    }));

    // Populate timetable data with class information
    Object.keys(data.days).forEach((day) => {
      data.days[day].forEach(({ subject, time, room }) => {
        const timeIndex = timeSlots.indexOf(time);
        if (timeIndex !== -1) {
          timetable[timeIndex][day] = `Subject:${subject} - Venue:(${room})`; // Include the room/venue along with the subject
        }
      });
    });

    return timetable;
  }, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: timetableData });

  return (
    <table {...getTableProps()} style={{ border: 'solid 1.2px grey' }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  background: '#2a2438',
                  color: 'white',
                  fontWeight: 500,
                  fontSize: "1rem"
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  style={{
                    padding: '1rem',
                    background: '#dbd8e3',
                  }}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
