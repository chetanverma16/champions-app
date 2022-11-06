import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Typography,
  Avatar,
  Chip,
  TableFooter,
  TablePagination,
} from "@mui/material";
import React, { useEffect } from "react";
import { Character } from "../../types";

type Props = {
  characters: Character[];
  selectedIds: number[];
  handleSelection: (selection: number) => void;
  myTeamActive: boolean;
};

const List = ({ characters, selectedIds, handleSelection }: Props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - characters.length) : 0;

  useEffect(() => {
    setPage(0);
  }, [characters]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!characters) {
    return (
      <Typography className="mt-10" variant="h6" color="textSecondary">
        No characters found
      </Typography>
    );
  }

  return (
    <TableContainer className="my-10 bg-white rounded-xl shadow-xl border-transparent">
      <Table>
        <TableHead className="bg-gray-50 bg-opacity-0">
          <TableRow>
            <TableCell className="border-transparent w-2/6">
              Character
            </TableCell>
            <TableCell className="border-transparent w-2/6">Tags</TableCell>
            <TableCell className="border-transparent">Power</TableCell>
            <TableCell className="border-transparent">Mobility</TableCell>
            <TableCell className="border-transparent">Technique</TableCell>
            <TableCell className="border-transparent">Survivability</TableCell>
            <TableCell className="border-transparent">Energy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? characters.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : characters
          ).map(({ id, name, thumbnail, tags, abilities }) => (
            <TableRow
              key={id}
              className={`bg-opacity-0 ${
                selectedIds.includes(id) && "bg-gray-50 bg-opacity-100"
              }`}
            >
              <TableCell className="flex items-center">
                <Checkbox
                  className="color-primary"
                  checked={selectedIds.includes(id)}
                  onChange={() => handleSelection(id)}
                ></Checkbox>
                <Avatar
                  className="ml-5 object-cover border-primary border"
                  alt={name}
                  src={thumbnail}
                />
                <Typography className="ml-5">{name}</Typography>
              </TableCell>
              <TableCell>
                {tags &&
                  tags.map(({ slot, tag_name }) => (
                    <Chip
                      className="ml-2 border-primary text-primary first:ml-0"
                      key={slot}
                      label={tag_name}
                      variant="outlined"
                    />
                  ))}
              </TableCell>
              <TableCell>{abilities[3].abilityScore}</TableCell>
              <TableCell>{abilities[0].abilityScore}</TableCell>
              <TableCell>{abilities[1].abilityScore}</TableCell>
              <TableCell>{abilities[2].abilityScore}</TableCell>
              <TableCell>{abilities[4].abilityScore}</TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={3}
              count={characters.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default React.memo(List);
