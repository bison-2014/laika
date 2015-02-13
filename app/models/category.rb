class Category
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :code, type: String
  field :subcategory_name, type: String
  field :subcategory_code, type: String

end
