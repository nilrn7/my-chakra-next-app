import { useRef, useState } from "react";
import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useOutsideClick,
  HStack,
  Text,
  Button,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { format } from "date-fns";

export default function MonthPicker({ value, onChange }) {
  const now = new Date();
  const [selectedDate, setSelectedDate] = useState(
    value ?? new Date(now.getFullYear(), now.getMonth())
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref = useRef();

  useOutsideClick({
    ref,
    handler: () => onClose(),
  });

  const months = Array.from({ length: 12 }, (_, i) =>
    format(new Date(2000, i), "MMM")
  );

  const handleMonthClick = (monthIndex) => {
    const updated = new Date(selectedDate.getFullYear(), monthIndex);
    setSelectedDate(updated);
    onChange?.(updated);
    onClose();
  };

  const changeYear = (delta) => {
    const updated = new Date(
      selectedDate.getFullYear() + delta,
      selectedDate.getMonth()
    );
    setSelectedDate(updated);
  };

  return (
    <Box position="relative" ref={ref}>
      {/* Input that triggers popover */}
      <InputGroup>
        <Input
          readOnly
          value={format(selectedDate, "MMM yyyy")}
          onClick={onOpen}
          cursor="pointer"
        />
        <InputRightElement pointerEvents="none">
          <Icon as={ChevronDownIcon} />
        </InputRightElement>
      </InputGroup>

      {/* Popup Month Selector */}
      {isOpen && (
        <Box
          position="absolute"
          mt={2}
          p={4}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          bg="white"
          shadow="md"
          zIndex={10}
          w="250px"
        >
          {/* Year Navigation */}
          <HStack justify="space-between" mb={4}>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => changeYear(-1)}
              leftIcon={<ChevronLeftIcon />}
            >
              Prev
            </Button>
            <Text fontWeight="bold">{selectedDate.getFullYear()}</Text>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => changeYear(1)}
              rightIcon={<ChevronRightIcon />}
            >
              Next
            </Button>
          </HStack>

          {/* Month Grid */}
          <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
            {months.map((m, i) => (
              <Button
                key={m}
                size="sm"
                variant={i === selectedDate.getMonth() ? "solid" : "outline"}
                colorScheme={i === selectedDate.getMonth() ? "teal" : "gray"}
                onClick={() => handleMonthClick(i)}
              >
                {m}
              </Button>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
