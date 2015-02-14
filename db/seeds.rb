# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'csv'

Yelp.client.configure do |config|
  config.consumer_key = YELP['yelp_consumer_key']
  config.consumer_secret = YELP['yelp_consumer_secret']
  config.token = YELP['yelp_token']
  config.token_secret = YELP['yelp_token_secret']
end

# seed categories
Category.destroy_all

CSV.foreach('db/yelp-categories.csv', headers: true) do |row|
  Category.create(name: row['name'],
                  code: row['code'],
      subcategory_code: row['subcategory_code'],
      subcategory_name: row['subcategory_name'])
end

# seed one location (Chicago)
Location.destroy_all

location = Location.new(name: 'Chicago')
location.coordinates = [41.8369, -87.6847]
location.save!

Location.each do |location|
  Category.each do |category|
    puts "Searching for #{category.subcategory_code} in #{location.name}"
    result = Yelp.client.search_by_coordinates(location.coordinate_hash, { sort: 2, category_filter: category.subcategory_code, radius_filter: 40000 })
    result.businesses.each do |business|
      if business.respond_to?(:location) && business.location.respond_to?(:coordinate)
        a = Attraction.new(name: business.name,
                         rating: business.rating,
                    coordinates: [business.location.coordinate.latitude, business.location.coordinate.longitude],
                   review_count: business.review_count,
                        yelp_id: business.id,
                       location: location,
                      )
        a.categories << category
        a.save
      end
    end
    # sleep()
  end
end