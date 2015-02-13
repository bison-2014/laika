class Category
  include Mongoid::Document
  field :subcategory, type: String
  field :main_category, type: String
end
