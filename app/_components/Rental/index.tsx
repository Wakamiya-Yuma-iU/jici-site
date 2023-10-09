'use client';
import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Box,
  IconButton,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

interface Equipment {
  item_id: number;
  name: string;
  description: string;
  quantity: number;
  category_id: number;
  location: number;
}

interface SelectedItem {
  item: Equipment;
  selectedQuantity: number;
}

const mockData: Equipment[] = [
  { item_id: 1, name: 'test_i_1', description: 'test', quantity: 3, category_id: 1, location: 1 },
  { item_id: 2, name: 'test_i_2', description: '', quantity: 3, category_id: 1, location: 1 },
  {
    item_id: 3,
    name: 'test_i_3',
    description: 'testtest',
    quantity: 3,
    category_id: 1,
    location: 1,
  },
  { item_id: 4, name: 'test_i_4', description: '', quantity: 2, category_id: 1, location: 1 },
];

export default function Rental() {
  const [equipments, setEquipments] = useState<Equipment[]>(mockData);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const groupedByCategory = equipments.reduce((acc, curr) => {
    (acc[curr.category_id] = acc[curr.category_id] || []).push(curr);
    return acc;
  }, {} as Record<number, Equipment[]>);

  const handleRowClick = (item: Equipment) => {
    const currentItem = selectedItems.find((i) => i.item.item_id === item.item_id);
    if (currentItem) {
      if (currentItem.selectedQuantity < currentItem.item.quantity) {
        setSelectedItems((prev) =>
          prev.map((i) =>
            i.item.item_id === item.item_id
              ? { ...i, selectedQuantity: i.selectedQuantity + 1 }
              : i,
          ),
        );
      }
    } else {
      setSelectedItems((prev) => [...prev, { item, selectedQuantity: 1 }]);
    }
  };
  const getRowBackgroundColor = (item: Equipment) => {
    const selectedItem = selectedItems.find((i) => i.item.item_id === item.item_id);
    if (!selectedItem) return 'inherit';

    const opacity = Math.min(0.8, 0.2 + 0.1 * selectedItem.selectedQuantity);
    return `rgba(173, 216, 230, ${opacity})`;
  };

  const handleMinusClick = (item: Equipment) => {
    const currentItem = selectedItems.find((i) => i.item.item_id === item.item_id);
    if (currentItem) {
      if (currentItem.selectedQuantity > 1) {
        setSelectedItems((prev) =>
          prev.map((i) =>
            i.item.item_id === item.item_id
              ? { ...i, selectedQuantity: i.selectedQuantity - 1 }
              : i,
          ),
        );
      } else {
        setSelectedItems((prev) => prev.filter((i) => i.item.item_id !== item.item_id));
      }
    }
  };

  return (
    <div>
      <Paper elevation={3} style={{ marginBottom: '20px', padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          選択中のアイテム
        </Typography>
        {selectedItems.length > 0 ? (
          selectedItems.map((item) => (
            <Typography key={item.item.item_id}>
              {item.item.name} x{item.selectedQuantity}
            </Typography>
          ))
        ) : (
          <Typography color="textSecondary">アイテムが選択されていません</Typography>
        )}
      </Paper>

      {Object.entries(groupedByCategory).map(([categoryId, items]) => (
        <Accordion key={categoryId}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>カテゴリ {categoryId}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Table>
              <TableBody>
                {items.map((item) => (
                  <TableRow
                    key={item.item_id}
                    onClick={() => handleRowClick(item)}
                    style={{ cursor: 'pointer', backgroundColor: getRowBackgroundColor(item) }}
                  >
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMinusClick(item);
                        }}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
