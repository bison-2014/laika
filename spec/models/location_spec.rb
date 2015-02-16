require 'rails_helper'
require 'mongoid_helper'

RSpec.describe Location, type: :model do
  it { is_expected.to validate_presence_of(:city) }
  it { is_expected.to validate_presence_of(:region) }
  it { is_expected.to validate_presence_of(:longlat) }
  it { is_expected.to have_many(:attractions) }
end
