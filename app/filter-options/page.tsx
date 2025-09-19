"use client";

import { FilterOptions } from "../../registry/new-york/components/filter-options/filter-options";

const amenityOptions = [
  { id: "wifi", label: "Wifi", selected: true },
  { id: "washer", label: "Washer", selected: false },
  { id: "air-conditioner", label: "Air Conditioner", selected: false },
  { id: "kitchen", label: "Kitchen", selected: false },
  { id: "dryer", label: "Dryer", selected: false },
  { id: "dedicated-workspace", label: "Dedicated Workspace", selected: true },
  { id: "heating", label: "Heating", selected: false },
  { id: "tv", label: "TV", selected: false },
  { id: "iron", label: "Iron", selected: false },
];

export default function FilterOptionsPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <FilterOptions
        title="Amenities"
        subtitle="Essentials"
        options={amenityOptions}
        showMoreCount={6}
        onSelectionChange={(selectedIds) => {
          console.log("Selected amenities:", selectedIds);
        }}
      />
    </div>
  );
}