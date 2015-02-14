class AttractionsController < ApplicationController
  respond_to :html, :js, :json



  def create
    # respond_to do |format|
    #   format.json { render json: {test: 'test'} }
    # end
    # p request
    p "______________________"
    p "______________________"
    p "______________________"
    p "______________________"
    p "______________________"
    p "______________________"
    p "______________________"
    p "______________________"
    p "______________________"
    # @attractions = []
    # 5.times { @attractions << Attraction.all.sample }
    # @attractions.to_json

    render json: {}
  end
end