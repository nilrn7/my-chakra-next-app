import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useOutsideClick,
  HStack,
  Button,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useRef, useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";

export default function CustomMonthPicker({
  selectedDate,
  onDateChange,
  inputProps,
  ...props
}) {
  const [date, setDate] = useState(selectedDate);
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const monthPickerRef = useRef(null);

  useOutsideClick({
    ref: monthPickerRef,
    handler: () => {
      setDate(selectedDate);
      onClose();
    },
  });

  useEffect(() => {
    setDate(selectedDate);
    setCurrentYear(selectedDate.getFullYear());
  }, [selectedDate]);

  const formatMonthYear = useCallback((date) => {
    return format(date, "MMMM yyyy");
  }, []);

  const inputValue = formatMonthYear(date);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function onSubmit() {
    onDateChange(date);
    onClose();
  }

  function onClear() {
    const today = new Date();
    const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    setDate(firstOfMonth);
    onDateChange(firstOfMonth);
    onClose();
  }

  const handleMonthSelect = (monthIndex) => {
    const newDate = new Date(currentYear, monthIndex, 1);
    setDate(newDate);
  };

  const handleYearChange = (increment) => {
    const newYear = currentYear + increment;
    setCurrentYear(newYear);
    // Update the date to the same month but new year
    const newDate = new Date(newYear, date.getMonth(), 1);
    setDate(newDate);
  };

  return (
    <Box position="relative" display="inline-block">
      <InputGroup
        size="sm"
        width="180px"
        onClick={onOpen}
        borderColor={isOpen ? "blue.500" : "gray.200"}
      >
        <InputRightElement>
          <Icon
            as={FaCalendarAlt}
            color="gray.400"
            fontSize="14px"
            cursor="pointer"
          />
        </InputRightElement>
        <Input
          value={inputValue}
          readOnly
          bg="white"
          cursor="pointer"
          fontSize="14px"
          borderRadius="5px"
          {...inputProps}
        />
      </InputGroup>
      {isOpen && (
        <Box
          ref={monthPickerRef}
          bg="white"
          position="absolute"
          top="35px"
          left="0"
          border="1px solid lightgray"
          borderRadius="3px"
          boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
          zIndex="999"
          p={3}
          minWidth="280px"
          {...props}
        >
          {/* Year Navigation */}
          <HStack justify="space-between" mb={3}>
            <Button
              onClick={() => handleYearChange(-1)}
              variant="ghost"
              size="sm"
              minW="32px"
              h="32px"
            >
              ‹
            </Button>
            <Text fontWeight="semibold" textAlign="center">
              {currentYear}
            </Text>
            <Button
              onClick={() => handleYearChange(1)}
              variant="ghost"
              size="sm"
              minW="32px"
              h="32px"
            >
              ›
            </Button>
          </HStack>

          {/* Month Grid */}
          <SimpleGrid columns={3} spacing={2} mb={4}>
            {monthNames.map((monthName, index) => {
              const isSelected =
                date.getMonth() === index && date.getFullYear() === currentYear;
              return (
                <Button
                  key={monthName}
                  onClick={() => handleMonthSelect(index)}
                  variant={isSelected ? "solid" : "ghost"}
                  colorScheme={isSelected ? "blue" : "gray"}
                  size="sm"
                  fontSize="12px"
                  p={2}
                >
                  {monthName}
                </Button>
              );
            })}
          </SimpleGrid>

          <HStack justify="flex-end" mt={2}>
            <Button variant="solid" onClick={onClear} mr={1} size="sm">
              Clear
            </Button>
            <Button variant="ghost" onClick={onSubmit} size="sm">
              Apply
            </Button>
          </HStack>
        </Box>
      )}
    </Box>
  );
}
