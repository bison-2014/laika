class BSON::ObjectId
  def as_json
    self.to_s
  end
end