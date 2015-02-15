class MapsController < ApplicationController

  respond_to :json

  def index
  end

  def search
    geometry = params['features'][0]['geometry']
    @attractions = Attraction.search_within(geometry).all.to_a
    render json: { attractions: @attractions }
  end

# need to set current_user in order for this to work
  # def search
  #   geometry = params['features'][0]['geometry']
  #   if current_user.interests.count > 0
  #     @matching_attractions = user.interests.each { |categ| categ.attractions }
  #     @attractions = @matching_attractions.search_within(geometry).all.to_a
  #   else
  #     @attractions = Attraction.search_within(geometry).all.to_a
  #   end
  #   render json: { attractions: @attractions }
  # end

end


#from console this works: u.interests.each { |interest| p interest.attractions }
#displays all the business names: u.interests.each { |intr| p intr.attractions.each { |attr| p attr.name } }
