const filterOptions = [
  { label: "cumulative_layout_shift", value: "cumulative_layout_shift" },
  { label: "first_contentful_paint", value: "first_contentful_paint" },
  { label: "interaction_to_next_paint", value: "interaction_to_next_paint" },
  { label: "largest_contentful_paint", value: "largest_contentful_paint" },
  { label: "experimental_time_to_first_byte", value: "experimental_time_to_first_byte" },
  { label: "largest_contentful_paint_resource_type", value: "largest_contentful_paint_resource_type" },
  { label: "largest_contentful_paint_image_time_to_first_byte", value: "largest_contentful_paint_image_time_to_first_byte" },
  { label: "largest_contentful_paint_image_resource_load_delay", value: "largest_contentful_paint_image_resource_load_delay" },
  { label: "largest_contentful_paint_image_resource_load_duration", value: "largest_contentful_paint_image_resource_load_duration" },
  { label: "largest_contentful_paint_image_element_render_delay", value: "largest_contentful_paint_image_element_render_delay" },
  { label: "navigation_types", value: "navigation_types" },
  { label: "round_trip_time", value: "round_trip_time" },
  { label: "form_factors", value: "form_factors"}
];

const filterOptionValueToLabel = {
  cumulative_layout_shift: "CLS",
  first_contentful_paint: "FCP",
  form_factors: "Form Factors",
  interaction_to_next_paint: "Interaction To Next Paint",
  largest_contentful_paint: "LCP",
  experimental_time_to_first_byte: "Experimental TTFB",
  largest_contentful_paint_resource_type:
    "LCP Resource Type",
  largest_contentful_paint_image_time_to_first_byte:
    "LCP Image TTFB",
  largest_contentful_paint_image_resource_load_delay:
    "LCP Image Resource Load Delay",
  largest_contentful_paint_image_resource_load_duration:
    "LCP Image Resource Load Duration",
  largest_contentful_paint_image_element_render_delay:
    "LCP Image Element Render Delay",
  navigation_types: "Navigation Types",
  round_trip_time: "Round Trip Time",
};

export { filterOptions, filterOptionValueToLabel };