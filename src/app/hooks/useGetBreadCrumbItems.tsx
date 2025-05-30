import { useParams } from "next/navigation";
import { useGetStore } from "../api/hooks/store/useGetStore";
import useGetCategories from "../api/hooks/category/useGetCategories";

export const useBreadcrumbItems = () => {
  const { subCategoryId, categoryId } = useParams();
  const { data: store } = useGetStore();
  const { data: categoriesArray } = useGetCategories();

  const currentCategories = categoriesArray?.find(
    (category) => category.id === categoryId,
  );
  const currentSubCategories = currentCategories?.subCategories?.find(
    (subCategory) => subCategory.id === subCategoryId,
  );

  const items = [];

  if (store) {
    items.push({
      link: `/${store.name}`,
      active: false,
      text: "Main Page",
    });
  }

  if (currentCategories && store) {
    items.push({
      link: `/${store.name}/${categoryId}`,
      active: false,
      text: currentCategories.name,
    });
  }

  if (currentSubCategories && store) {
    items.push({
      link: `/${store.name}/${categoryId}/${subCategoryId}`,
      active: false,
      text: currentSubCategories.name,
    });
  }

  if (items.length > 0) {
    items[items.length - 1].active = true;
  }

  return items;
};
