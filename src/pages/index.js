import React, { useState } from "react";
import { ChakraProvider, Box, Text } from "@chakra-ui/react";
import CustomMonthPicker from "../components/CustomMonthPicker";

export default function App() {
  // Step 1: Keep selected date in state
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Step 2: Handle date change from picker
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <ChakraProvider>
      <Box p={6}>
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Custom Month Picker
        </Text>

        <Box mb={4}>
          <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
            Select Month/Year:
          </Text>
          {/* Step 3: Use CustomMonthPicker */}
          <CustomMonthPicker
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
          />
        </Box>

        {/* Step 4: Display selected value */}
        <Box mt={6} p={4} bg="gray.50" borderRadius="md">
          <Text fontSize="lg">
            Selected Month/Year:{" "}
            <Text as="span" fontWeight="bold" color="blue.600">
              {selectedDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </Text>
          </Text>
          <Text fontSize="sm" color="gray.600" mt={2}>
            Full date: {selectedDate.toDateString()}
          </Text>
        </Box>

        <Box mt={6} fontSize="sm" color="gray.600">
          <Text>✅ You can now select any past or future month</Text>
          <Text>✅ Navigate between years using arrow buttons</Text>
          <Text>✅ Click outside to cancel changes</Text>
          <Text>✅ Uses Chakra UI components</Text>
          <Text>✅ Maintains your original API</Text>
        </Box>
      </Box>
    </ChakraProvider>
  );
}
