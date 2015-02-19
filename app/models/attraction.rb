class Attraction
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :rating, type: Integer
  field :review_count, type: Integer
  field :longlat, type: Hash
  field :city, type: String
  field :state, type: String
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
    # Grab all attractions within a geometry
    attractions = Attraction.where("longlat.coordinates" => {
                      "$geoWithin" => {
                          "$geometry" => geometry
                        }
                      }).where(:rating.gt => 3).where(:review_count.gt => 5).order_by(:rating.desc).all.to_a

    # Only grab attactions that share an interest with us
    attractions.select! { |attraction| (attraction.categories & interests).any? }

    # Only add the top 5 attractions per location
    hash = Hash.new()
    attractions.each do |attraction|
      hash[attraction.location_id] ||= []
      hash[attraction.location_id] << attraction if hash[attraction.location_id].length < 5
    end
    hash.values.flatten
  end

end


