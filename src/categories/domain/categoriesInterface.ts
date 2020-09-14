interface CategoriesInterface {
  id: string;
  userId: string;
  categoryGroupId: string;
  name: string;
  description: string;
  isRecurrent: boolean;
  budget: number;
  currency: string;
}

export default CategoriesInterface;
