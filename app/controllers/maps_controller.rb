class MapsController < ApplicationController

  respond_to :json

  def display
    @start = params[:map][:from]
    @end = params[:map][:to]
    @pitstop = params[:map][:waypoint]
  end

  def start_trip
  end

  def search
    geometry = params['features'][0]['geometry']
    if current_user
      interests = current_user.interests
      @attractions = Attraction.search_within(geometry, interests)
    else
      @attractions = Attraction.search_within(geometry)
    end
    render json: { attractions: @attractions }
  end

  def directions
  end

end



#from console this works: u.interests.each { |interest| p interest.attractions }
#displays all the business names: u.interests.each { |intr| p intr.attractions.each { |attr| p attr.name } }
