import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "@/supabase/supabase";
import {
  ColorType,
  GradientType,
  PaletteColor,
  PublishedPaletteType,
} from "@/utils/Types";

interface PaletteItem {
  name: string;
  description: string | null;
  colors: PaletteColor[];
  industries: string[];
  preferred_colors: string[];
  moods: string[];
  brightness_level: string[];
  saturation_level: string[];
  modes: string[];
  usecases: string[];
  harmonies: string[];
  tags: string[];
  status: string;
}

export const Api = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Palettes", "Colors", "Gradients", "Fonts"],
  endpoints: (builder) => ({
    fetchPalettes: builder.query<
      PublishedPaletteType[],
      {
        industries: string[];
        preferred_colors: string[];
        moods: string[];
        brightness_level: string[];
        saturation_level: string[];
        modes: string[];
        usecases: string[];
        harmonies: string[];
        searchQuery: string;
      }
    >({
      queryFn: async ({
        industries,
        preferred_colors,
        moods,
        brightness_level,
        saturation_level,
        modes,
        usecases,
        harmonies,
        searchQuery,
      }) => {
        try {
          let query = supabase
            .from("palettes")
            .select("*")
            .eq("status", "Published")
            .order("id", { ascending: false });

          if (industries.length > 0) {
            query = query.contains("industries", JSON.stringify(industries));
          }

          if (preferred_colors.length > 0) {
            query = query.contains(
              "preferred_colors",
              JSON.stringify(preferred_colors),
            );
          }

          if (moods.length > 0) {
            query = query.contains("moods", JSON.stringify(moods));
          }

          if (brightness_level.length > 0) {
            query = query.contains(
              "brightness_level",
              JSON.stringify(brightness_level),
            );
          }

          if (saturation_level.length > 0) {
            query = query.contains(
              "saturation_level",
              JSON.stringify(saturation_level),
            );
          }

          if (modes.length > 0) {
            query = query.contains("modes", JSON.stringify(modes));
          }

          if (usecases.length > 0) {
            query = query.contains("usecases", JSON.stringify(usecases));
          }

          if (harmonies.length > 0) {
            query = query.contains("harmonies", JSON.stringify(harmonies));
          }

          if (searchQuery && searchQuery.trim() !== "") {
            query = query.ilike("name", `%${searchQuery.trim()}%`);
          }

          const { data, error } = await query;
          if (error) return { error };

          return { data: (data as PublishedPaletteType[]) || [] };
        } catch (error: any) {
          return { error };
        }
      },
      providesTags: ["Palettes"],
    }),
    fetchPaletteById: builder.query<PublishedPaletteType, { id: number }>({
      queryFn: async ({ id }) => {
        try {
          const { data, error } = await supabase
            .from("palettes")
            .select("*")
            .eq("id", id)
            .eq("status", "Published")
            .single();

          if (error) return { error };
          return { data: data as PublishedPaletteType };
        } catch (error: any) {
          return { error };
        }
      },
      providesTags: ["Palettes"],
    }),
    fetchSimilarPalettes: builder.query<
      PublishedPaletteType[],
      {
        field: string;
        values: string[];
        excludeId: number;
      }
    >({
      queryFn: async ({ field, values, excludeId }) => {
        try {
          const { data, error } = await supabase
            .from("palettes")
            .select("*")
            .eq("status", "Published")
            .contains(field, JSON.stringify(values))
            .neq("id", excludeId)
            .order("id", { ascending: false });

          if (error) return { error };
          return { data: (data as PublishedPaletteType[]) || [] };
        } catch (error: any) {
          return { error };
        }
      },
      providesTags: ["Palettes"],
    }),
    fetchColors: builder.query<ColorType[], { searchQuery: string }>({
      queryFn: async ({ searchQuery }) => {
        try {
          let query = supabase.from("colors").select("*");

          if (searchQuery && searchQuery.trim() !== "") {
            query = query.or(`name.ilike.%${searchQuery}%`);
          }

          const { data, error } = await query;

          if (error) return { error };

          return { data: data as ColorType[] };
        } catch (error: any) {
          return { error };
        }
      },
      providesTags: ["Colors"],
    }),
    fetchGradients: builder.query<
      GradientType[],
      {
        preferred_colors: string[];
        searchQuery: string;
      }
    >({
      queryFn: async ({ preferred_colors, searchQuery }) => {
        try {
          let query = supabase.from("gradients").select("*");

          if (preferred_colors.length > 0) {
            query = query.contains(
              "parent_colors",
              JSON.stringify(preferred_colors),
            );
          }

          if (searchQuery && searchQuery.trim() !== "") {
            query = query.or(`name.ilike.%${searchQuery}%`);
          }

          const { data, error } = await query;

          if (error) return { error };

          return { data: data as GradientType[] };
        } catch (error: any) {
          return { error };
        }
      },
      providesTags: ["Gradients"],
    }),
    publishPalette: builder.mutation<{ success: boolean }, PaletteItem>({
      queryFn: async (palette) => {
        try {
          const { data: nameData } = await supabase
            .from("palettes")
            .select("name")
            .eq("name", palette.name);

          if (nameData?.length !== 0) {
            return {
              error: {
                message: `This name (${palette.name}) is already taken.`,
              },
            };
          }
          const { error } = await supabase.from("palettes").insert(palette);

          if (error) return { error };
          return { data: { success: true } };
        } catch (error: any) {
          return { error };
        }
      },
      invalidatesTags: ["Palettes"],
    }),
    addProductUpdateEmail: builder.mutation<
      { success: boolean },
      { email: string }
    >({
      queryFn: async ({ email }) => {
        try {
          const { error } = await supabase
            .from("user_emails")
            .insert({ email });

          if (error) {
            if (error.message.includes("duplicate")) {
              return {
                error: { message: "This email already exists." },
              };
            }

            return { error: { message: error.message } };
          }

          return { data: { success: true } };
        } catch (error: any) {
          return { error };
        }
      },
    }),
    addFeedback: builder.mutation<
      { success: boolean },
      { type: string; message: string; rating: number }
    >({
      queryFn: async ({ type, message, rating }) => {
        try {
          const { error } = await supabase.from("feedback").insert({
            type,
            message,
            rating,
          });
          if (error) return { error };

          return { data: { success: true } };
        } catch (error: any) {
          return { error };
        }
      },
    }),
  }),
});

export const {
  useFetchPalettesQuery,
  useFetchPaletteByIdQuery,
  useFetchSimilarPalettesQuery,
  useFetchColorsQuery,
  useFetchGradientsQuery,
  usePublishPaletteMutation,
  useAddProductUpdateEmailMutation,
  useAddFeedbackMutation,
} = Api;
