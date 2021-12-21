import styled from 'styled-components';

export const Table = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100vw;
`;

export const TableHeader = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

export const TableHead = styled.thead``;

export const TableBody = styled.tbody``;

export const TableData = styled.td`
  border: 1px solid #deeedd;
  text-align: left;
  padding: 8px;
`;

export const TableRow = styled.tr`
  &&:nth-child(even) {
    background-color: #deeedd;
  }
`;
