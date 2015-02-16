class Seed
  include Mongoid::Document
  include Mongoid::Timestamps

  belongs_to :location
  belongs_to :category
end