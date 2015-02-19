class Attraction
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :rating, type: Integer
  field :review_count, type: Integer
  field :longlat, type: Hash
  field :yelp_id, type: String
  field :yelp_categories
  field :yelp_mobile_url, type: String
  field :yelp_url, type: String
  field :yelp_image_url, type: String

  belongs_to :location
  has_and_belongs_to_many :categories
  has_and_belongs_to_many :trips

  validates_presence_of :name, :longlat, :yelp_id
  validates_uniqueness_of :yelp_id

  def longitude
    self.longlat['coordinates'][0]
  end

  def latitude
    self.longlat['coordinates'][1]
  end

  def self.search_within(geometry, interests = [])
    Attraction.where("longlat.coordinates" => {
                      "$geoWithin" => {
                          "$geometry" => geometry
                        }
                      }).all.to_a.select { |attraction| (attraction.categories & interests).any? }
  end

end


