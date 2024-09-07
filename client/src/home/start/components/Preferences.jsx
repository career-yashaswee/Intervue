import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase,
  MapPin,
  Building2,
  Factory,
  AlertCircle,
  Target,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const jobTypes = ["Internship", "Freelance", "Full-Time", "Part-Time"];
const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];
const companyTypes = ["Start-ups", "MNCs", "SMEs", "Government", "Non-profit"];
const industries = [
  "IT",
  "Medical",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Hospitality",
];

const useSearch = (items, searchTerm) => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchTerm.length < 2) {
      setResults([]);
      setError(null);
      return;
    }

    const filteredItems = items.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredItems.length === 0) {
      setError("No matches found");
    } else {
      setError(null);
    }

    setResults(filteredItems);
  }, [searchTerm, items]);

  return { results, error };
};

// interface SearchInputProps {
//   id: string
//   label: string
//   icon: React.ReactNode
//   placeholder: string
//   items: string[]
//   selectedItems: string[]
//   setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
// }

const SearchInput = ({
  id,
  label,
  icon,
  placeholder,
  items,
  selectedItems,
  setSelectedItems,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { results, error } = useSearch(items, searchTerm);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddItem = (item) => {
    if (!selectedItems.includes(item) && selectedItems.length < 3) {
      setSelectedItems([...selectedItems, item]);
      setSearchTerm("");
      if (selectedItems.length === 2) {
        toast.info(`Maximum of 3 ${label.toLowerCase()} selected!`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  const handleRemoveItem = (item) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="flex items-center gap-2">
          {icon}
          <span>{label}</span>
        </Label>
        <AnimatePresence>
          {error && (
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="text-red-500 text-sm flex items-center"
            >
              <AlertCircle className="h-4 w-4 mr-1" />
              {error}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      {isLoading ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <div className="relative">
          <Input
            id={id}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            disabled={selectedItems.length >= 3}
          />
          <AnimatePresence>
            {results.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1"
              >
                {results.map((result) => (
                  <motion.li
                    key={result}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleAddItem(result)}
                  >
                    {result}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      )}
      <div className="flex flex-wrap gap-2 mt-2">
        <AnimatePresence>
          {selectedItems.map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
            >
              {item}
              <button
                type="button"
                onClick={() => handleRemoveItem(item)}
                className="ml-2 focus:outline-none"
                aria-label={`Remove ${item}`}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function Preferences() {
  const [jobTypes, setJobTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [industries, setIndustries] = useState([]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="w-full max-w-md mx-auto">
        <div className="h-1 bg-gradient-to-r from-blue-500 to-green-500" />
        <CardContent className="mt-4">
          <form className="space-y-6">
            <SearchInput
              id="domain"
              label="Domain"
              icon={<Target className="h-4 w-4" />}
              placeholder="Search Domains"
              items={jobTypes}
              selectedItems={jobTypes}
              setSelectedItems={setJobTypes}
            />

            <Separator />

            <SearchInput
              id="job-type"
              label="Job Type"
              icon={<Briefcase className="h-4 w-4" />}
              placeholder="Search job types"
              items={jobTypes}
              selectedItems={jobTypes}
              setSelectedItems={setJobTypes}
            />

            <Separator />

            <SearchInput
              id="location"
              label="Preferred Locations"
              icon={<MapPin className="h-4 w-4" />}
              placeholder="Search for Indian states"
              items={indianStates}
              selectedItems={locations}
              setSelectedItems={setLocations}
            />

            <Separator />

            <SearchInput
              id="company"
              label="Preferred Companies"
              icon={<Building2 className="h-4 w-4" />}
              placeholder="Search company types"
              items={companyTypes}
              selectedItems={companies}
              setSelectedItems={setCompanies}
            />

            <Separator />

            <SearchInput
              id="industry"
              label="Preferred Industries"
              icon={<Factory className="h-4 w-4" />}
              placeholder="Search industries"
              items={industries}
              selectedItems={industries}
              setSelectedItems={setIndustries}
            />
          </form>
        </CardContent>
      </Card>
      <ToastContainer />
    </motion.div>
  );
}
