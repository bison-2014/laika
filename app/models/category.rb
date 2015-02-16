class Category
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :code, type: String
  field :subcategory_name, type: String
  field :subcategory_code, type: String

  has_and_belongs_to_many :attractions
  belongs_to :users

  validates_presence_of :name, :subcategory_name, :code, :subcategory_code
  validates_uniqueness_of :subcategory_code
end
